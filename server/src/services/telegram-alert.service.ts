// ==============================================================================
// ScienceKH — Real-Time Telegram Security Alerting Service
// Dispatches instant, formatted anti-tamper alerts to system administrators
// with built-in deduplication, rate-limit throttling, and zero-crash fault tolerance.
// ==============================================================================

import type { Request } from "express";
import { config } from "../config/env.js";

export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface SecurityAlertPayload {
  title: string;
  severity: AlertSeverity;
  event: string;
  ip: string;
  email?: string;
  country?: string;
  method?: string;
  endpoint?: string;
  userAgent?: string;
  signature?: string;
  payloadSnippet?: string;
  details?: Record<string, unknown>;
  actionTaken?: string;
}

/**
 * Safely extracts caller email from:
 * 1. req.user (authenticated session)
 * 2. req.body.email or req.query.email (login/registration/password-reset forms)
 * 3. Authorization Bearer JWT payload (decoded safely)
 */
export function extractCallerEmail(req: Request): string | undefined {
  if (req.user?.email) return req.user.email;

  if (req.body && typeof req.body === "object") {
    const bodyEmail = (req.body as Record<string, unknown>).email;
    if (typeof bodyEmail === "string" && bodyEmail.includes("@")) {
      return bodyEmail;
    }
  }

  if (req.query && typeof req.query.email === "string" && req.query.email.includes("@")) {
    return req.query.email;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const parts = token.split(".");
      if (parts.length === 3) {
        const payloadJson = Buffer.from(parts[1], "base64url").toString("utf8");
        const payload = JSON.parse(payloadJson);
        if (typeof payload.email === "string") return payload.email;
        if (typeof payload.user_metadata?.email === "string") return payload.user_metadata.email;
      }
    } catch {
      // Ignore token parse error
    }
  }

  return undefined;
}

interface CooldownEntry {
  lastSent: number;
  suppressedCount: number;
  timer?: NodeJS.Timeout;
}

class TelegramAlertService {
  private botToken: string;
  private chatId: string;
  private isEnabled: boolean;
  private cooldownSeconds: number;
  private cooldownMap: Map<string, CooldownEntry> = new Map();

  constructor() {
    this.botToken = config.telegram.botToken;
    this.chatId = config.telegram.chatId;
    this.isEnabled = config.telegram.enabled;
    this.cooldownSeconds = config.telegram.rateLimitSeconds;
  }

  /**
   * Check if Telegram alerts are configured and active
   */
  public isActive(): boolean {
    return this.isEnabled && Boolean(this.botToken && this.chatId);
  }

  /**
   * Escape HTML entities to prevent Telegram parse mode breaking
   */
  private escapeHtml(text: string): string {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /**
   * Truncate long strings for clean Telegram notifications
   */
  private truncate(str: string, maxLength = 300): string {
    if (!str) return "N/A";
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "... [truncated]";
  }

  /**
   * Format Cambodia Local Time (Asia/Phnom_Penh UTC+7)
   */
  private getCambodiaTime(): string {
    return new Date().toLocaleString("en-US", {
      timeZone: config.cambodiaTimezone,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  /**
   * Asynchronously send raw HTML message to Telegram Bot API
   */
  private async postToTelegram(htmlMessage: string): Promise<boolean> {
    if (!this.isActive()) {
      return false;
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: htmlMessage,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[TelegramAlert] API rejected message (${response.status}):`, errorText);
        return false;
      }

      return true;
    } catch (err) {
      console.error("[TelegramAlert] Network delivery failed:", (err as Error).message);
      return false;
    }
  }

  /**
   * Dispatch a security alert with deduplication & flood protection
   */
  public async sendAlert(alert: SecurityAlertPayload): Promise<void> {
    const dedupeKey = `${alert.event}:${alert.ip}`;
    const now = Date.now();
    const cooldownMs = this.cooldownSeconds * 1000;

    const existing = this.cooldownMap.get(dedupeKey);

    // If within cooldown period, suppress individual alert and increment count
    if (existing && now - existing.lastSent < cooldownMs) {
      existing.suppressedCount++;

      // Reschedule or set trailing timer to report the flood once quiet
      if (!existing.timer) {
        existing.timer = setTimeout(async () => {
          if (existing.suppressedCount > 0) {
            await this.sendAggregatedFloodAlert(alert, existing.suppressedCount);
          }
          this.cooldownMap.delete(dedupeKey);
        }, cooldownMs);
      }
      return;
    }

    // Set new cooldown entry
    this.cooldownMap.set(dedupeKey, {
      lastSent: now,
      suppressedCount: 0,
    });

    const severityEmoji =
      alert.severity === "CRITICAL"
        ? "🚨 <b>CRITICAL THREAT</b> 🔴"
        : alert.severity === "WARNING"
          ? "⚠️ <b>SECURITY WARNING</b> 🟡"
          : "ℹ️ <b>SYSTEM NOTICE</b> 🔵";

    const cambodiaTime = this.getCambodiaTime();

    let message = `${severityEmoji}\n`;
    message += `<b>${this.escapeHtml(alert.title)}</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏱ <b>Time:</b> <code>${cambodiaTime} (ICT)</code>\n`;
    message += `🌐 <b>Attacker IP:</b> <code>${this.escapeHtml(alert.ip)}</code>`;

    if (alert.country) {
      message += ` (<code>${this.escapeHtml(alert.country)}</code>)`;
    }
    message += `\n`;

    if (alert.email) {
      message += `👤 <b>Account Email:</b> <code>${this.escapeHtml(alert.email)}</code>\n`;
    } else {
      message += `👤 <b>Identity:</b> <i>Anonymous (Guest / Scanner)</i>\n`;
    }

    if (alert.method && alert.endpoint) {
      message += `🎯 <b>Target:</b> <code>${alert.method} ${this.escapeHtml(alert.endpoint)}</code>\n`;
    }

    if (alert.signature) {
      message += `🛡️ <b>Threat Rule:</b> <code>${this.escapeHtml(alert.signature)}</code>\n`;
    }

    if (alert.actionTaken) {
      message += `⚡ <b>Defense Action:</b> <b>${this.escapeHtml(alert.actionTaken)}</b>\n`;
    }

    if (alert.payloadSnippet) {
      message += `\n📦 <b>Payload Preview:</b>\n<pre>${this.escapeHtml(
        this.truncate(alert.payloadSnippet, 240)
      )}</pre>\n`;
    }

    if (alert.userAgent) {
      message += `\n🖥️ <b>User-Agent:</b> <code>${this.escapeHtml(
        this.truncate(alert.userAgent, 120)
      )}</code>\n`;
    }

    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `<i>ScienceKH Shield & Anti-Tamper Engine</i>`;

    // Non-blocking fire-and-forget
    setImmediate(() => {
      this.postToTelegram(message).catch((err) => {
        console.error("[TelegramAlert] Background send error:", err);
      });
    });
  }

  /**
   * Dispatch summary alert when an attacker spams repeated exploits
   */
  private async sendAggregatedFloodAlert(
    alert: SecurityAlertPayload,
    count: number
  ): Promise<void> {
    const cambodiaTime = this.getCambodiaTime();
    let message = `⚠️ <b>ATTACK FLOOD MITIGATED</b> 🟡\n`;
    message += `<b>Aggregated Threat Repetition Report</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏱ <b>Time:</b> <code>${cambodiaTime} (ICT)</code>\n`;
    message += `🌐 <b>Source IP:</b> <code>${this.escapeHtml(alert.ip)}</code>\n`;
    message += `📊 <b>Suppressed Repeated Hits:</b> <b>${count} requests</b>\n`;
    message += `🛡️ <b>Attack Type:</b> <code>${this.escapeHtml(alert.event)}</code>\n`;
    if (alert.endpoint) {
      message += `🎯 <b>Target Endpoint:</b> <code>${this.escapeHtml(alert.endpoint)}</code>\n`;
    }
    message += `⚡ <b>Status:</b> All malicious requests automatically rejected (HTTP 403/429)\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `<i>ScienceKH Shield Defense Cooldown System</i>`;

    await this.postToTelegram(message);
  }

  /**
   * Helper for Rate Limit / Brute-Force Violations
   */
  public sendRateLimitAlert(limiterName: string, req: Request): void {
    const ip = req.ip || req.socket.remoteAddress || "Unknown IP";
    const email = extractCallerEmail(req);
    const country = (req.headers["cf-ipcountry"] || req.headers["x-country-code"]) as string | undefined;

    this.sendAlert({
      title: `Rate Limit Breach: ${limiterName}`,
      severity: "WARNING",
      event: `rate_limit_${limiterName}`,
      ip,
      email,
      country,
      method: req.method,
      endpoint: req.originalUrl || req.url,
      userAgent: req.headers["user-agent"],
      signature: `express-rate-limit:${limiterName}`,
      actionTaken: "HTTP 429 Too Many Requests (Blocked)",
      details: {
        headers: req.headers,
      },
    });
  }

  /**
   * Helper for Forged / Tampered Payment Webhooks (Bakong KHQR)
   */
  public sendPaymentTamperAlert(reason: string, req: Request, details?: Record<string, unknown>): void {
    const ip = req.ip || req.socket.remoteAddress || "Unknown IP";
    const email = extractCallerEmail(req);
    const country = (req.headers["cf-ipcountry"] || req.headers["x-country-code"]) as string | undefined;

    this.sendAlert({
      title: "🚨 Payment Security: Invalid KHQR Webhook Signature",
      severity: "CRITICAL",
      event: "payment_webhook_tampering",
      ip,
      email,
      country,
      method: req.method,
      endpoint: req.originalUrl || req.url,
      userAgent: req.headers["user-agent"],
      signature: "HMAC-SHA256 Signature Mismatch",
      payloadSnippet: JSON.stringify(req.body || {}),
      actionTaken: "HTTP 401 Unauthorized - Dropped & Flagged",
      details: {
        reason,
        ...details,
      },
    });
  }

  /**
   * Helper for Academic Dishonesty / Anti-Cheating Flags (Bac II Exam Studio)
   */
  public sendAcademicIntegrityAlert(
    studentName: string,
    examTitle: string,
    violation: string,
    req: Request
  ): void {
    const ip = req.ip || req.socket.remoteAddress || "Unknown IP";
    this.sendAlert({
      title: `Academic Dishonesty Flag: ${examTitle}`,
      severity: "WARNING",
      event: "academic_integrity_violation",
      ip,
      method: req.method,
      endpoint: req.originalUrl || req.url,
      userAgent: req.headers["user-agent"],
      signature: "Anti-Cheating Sensor: Excessive Blur / Tab-Switch",
      payloadSnippet: `Student: ${studentName}\nExam: ${examTitle}\nViolation: ${violation}`,
      actionTaken: "Proctor Audit Flagged for Human Review",
    });
  }

  /**
   * Test Telegram connectivity and credentials
   */
  public async testAlert(): Promise<{ success: boolean; message: string }> {
    if (!this.botToken) {
      return {
        success: false,
        message: "TELEGRAM_BOT_TOKEN is missing in server environment variables.",
      };
    }
    if (!this.chatId) {
      return {
        success: false,
        message: "TELEGRAM_SECURITY_CHAT_ID is missing in server environment variables.",
      };
    }

    const cambodiaTime = this.getCambodiaTime();
    const testHtml = `✅ <b>ScienceKH Security Alert System Online!</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏱ <b>Timestamp:</b> <code>${cambodiaTime} (ICT)</code>\n` +
      `🛡️ <b>Status:</b> Telegram Bot Connected & Active\n` +
      `🔐 <b>Coverage:</b>\n` +
      ` • SQL Injection & XSS Real-Time Shield\n` +
      ` • Brute-Force Rate Limit Monitor\n` +
      ` • Bakong KHQR Webhook Anti-Tamper\n` +
      ` • MoEYS Bac II Academic Integrity Proctor\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `<i>System monitoring is actively safeguarding Cambodian scholars.</i>`;

    const ok = await this.postToTelegram(testHtml);
    if (ok) {
      return {
        success: true,
        message: "Test alert dispatched to Telegram successfully! Check your Telegram chat.",
      };
    }
    return {
      success: false,
      message: "Failed to deliver message to Telegram. Please check Bot Token, Chat ID, and ensure you have started the bot (/start).",
    };
  }
}

export const telegramAlertService = new TelegramAlertService();
