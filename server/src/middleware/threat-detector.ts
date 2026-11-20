// ==============================================================================
// ScienceKH — Real-Time Cyber Threat & Exploit Detection Middleware
// Detects and blocks malicious attack vectors:
//   - SQL Injection (SQLi)
//   - Cross-Site Scripting (XSS)
//   - Path Traversal & Local File Inclusion (LFI)
//   - Remote Command Execution (RCE)
//   - NoSQL & Prototype Pollution
//   - Vulnerability Scanners & Reconnaissance Probes
// ==============================================================================

import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { telegramAlertService, extractCallerEmail } from "../services/telegram-alert.service.js";

interface ThreatRule {
  name: string;
  category: "SQLi" | "XSS" | "PathTraversal" | "RCE" | "NoSQL" | "ScannerProbe";
  pattern: RegExp;
  severity: "CRITICAL" | "WARNING";
}

// Battle-tested attack signature regex patterns
const THREAT_RULES: ThreatRule[] = [
  // 1. SQL Injection Signatures
  {
    name: "SQLi: UNION SELECT",
    category: "SQLi",
    pattern: /\bunion\s+(all\s+)?select\b/i,
    severity: "CRITICAL",
  },
  {
    name: "SQLi: Boolean Authentication Bypass (OR 1=1 / AND 1=1)",
    category: "SQLi",
    pattern: /(?:'|"|`|\b)\s*(or|and)\s+['"]?[0-9]+['"]?\s*=\s*['"]?[0-9]+['"]?/i,
    severity: "CRITICAL",
  },
  {
    name: "SQLi: Time-based Blind (SLEEP / BENCHMARK)",
    category: "SQLi",
    pattern: /\b(sleep\(|pg_sleep\(|benchmark\(|waitfor\s+delay\b)/i,
    severity: "CRITICAL",
  },
  {
    name: "SQLi: Schema Exfiltration (INFORMATION_SCHEMA / sys.tables)",
    category: "SQLi",
    pattern: /\b(information_schema|sys\.tables|pg_catalog|sqlite_master)\b/i,
    severity: "CRITICAL",
  },
  {
    name: "SQLi: Destructive DDL (DROP / ALTER / TRUNCATE TABLE)",
    category: "SQLi",
    pattern: /\b(drop\s+table|alter\s+table|truncate\s+table)\b/i,
    severity: "CRITICAL",
  },

  // 2. Cross-Site Scripting (XSS) Signatures
  {
    name: "XSS: Script Tag Injection",
    category: "XSS",
    pattern: /<\s*script[^>]*>/i,
    severity: "WARNING",
  },
  {
    name: "XSS: Inline Event Handler Injection",
    category: "XSS",
    pattern: /\b(on(error|load|click|mouseover|submit|focus|blur))\s*=\s*["']?[^"'>]+/i,
    severity: "WARNING",
  },
  {
    name: "XSS: Pseudo-Protocol (javascript: / vbscript: / data:text/html)",
    category: "XSS",
    pattern: /\b(javascript|vbscript|data):/i,
    severity: "WARNING",
  },

  // 3. Path Traversal & LFI Signatures
  {
    name: "Path Traversal: Dot-Dot-Slash Sequence",
    category: "PathTraversal",
    pattern: /(?:\.\.[/\\])+/i,
    severity: "CRITICAL",
  },
  {
    name: "LFI: Sensitive System File Access (/etc/passwd, win.ini)",
    category: "PathTraversal",
    pattern: /\b(etc\/passwd|etc\/shadow|proc\/self\/environ|win\.ini|boot\.ini)\b/i,
    severity: "CRITICAL",
  },

  // 4. Remote Command Execution (RCE) & Shell Injections
  {
    name: "RCE: Shell Command Chaining (;|&&|curl|wget)",
    category: "RCE",
    pattern: /(?:;|&&|\|\|)\s*(?:curl|wget|bash|sh|nc|netcat|id|whoami|cat\s+\/etc)\b/i,
    severity: "CRITICAL",
  },
  {
    name: "RCE: Shell Command Substitution $(...)",
    category: "RCE",
    pattern: /\$\(\s*(?:curl|wget|id|whoami|bash|sh|uname)\b/i,
    severity: "CRITICAL",
  },

  // 5. NoSQL & Prototype Pollution
  {
    name: "Prototype Pollution: __proto__ or prototype",
    category: "NoSQL",
    pattern: /(?:__proto__|constructor\s*\.\s*prototype)/i,
    severity: "CRITICAL",
  },
  {
    name: "NoSQL: Mongo Query Operator ($where, $regex, $gt)",
    category: "NoSQL",
    pattern: /["']?\$where["']?\s*:/i,
    severity: "CRITICAL",
  },
];

// Vulnerability Scanner User-Agents
const MALICIOUS_USER_AGENTS = /\b(sqlmap|nikto|acunetix|nessus|nmap|masscan|wpscan|dirbuster|gobuster|zgrab|arachni)\b/i;

// Sensitive file probe paths common in bot crawling
const SENSITIVE_PROBE_PATHS = /(?:\.env|\.git|\.aws|\.ssh|wp-admin|wp-login|phpmyadmin|xmlrpc\.php|actuator\/health)\b/i;

/**
 * Recursively scans strings in request payload objects
 */
function scanObjectForThreats(obj: unknown, depth = 0): { rule: ThreatRule; match: string } | null {
  if (depth > 6 || !obj) return null;

  if (typeof obj === "string") {
    for (const rule of THREAT_RULES) {
      if (rule.pattern.test(obj)) {
        return { rule, match: obj };
      }
    }
    return null;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = scanObjectForThreats(item, depth + 1);
      if (found) return found;
    }
  } else if (typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      // Check the key name itself
      for (const rule of THREAT_RULES) {
        if (rule.pattern.test(key)) {
          return { rule, match: `[key] ${key}` };
        }
      }
      // Check the value
      const found = scanObjectForThreats(val, depth + 1);
      if (found) return found;
    }
  }

  return null;
}

/**
 * Real-Time Threat Detector Middleware
 */
export function threatDetector(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || "Unknown IP";
  const userAgent = req.headers["user-agent"] || "";
  const requestUrl = req.originalUrl || req.url;
  const email = extractCallerEmail(req);
  const country = (req.headers["cf-ipcountry"] || req.headers["x-country-code"]) as string | undefined;

  // 1. Detect Automated Vulnerability Scanners via User-Agent
  if (MALICIOUS_USER_AGENTS.test(userAgent)) {
    const incidentId = `INC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    telegramAlertService.sendAlert({
      title: "🚨 Automated Exploit Scanner Detected",
      severity: "CRITICAL",
      event: "scanner_probe_blocked",
      ip,
      email,
      country,
      method: req.method,
      endpoint: requestUrl,
      userAgent,
      signature: "User-Agent Vulnerability Scanner Signature",
      actionTaken: "HTTP 403 Forbidden (Blocked)",
      details: { incidentId },
    });

    res.status(403).json({
      success: false,
      error: "Forbidden",
      errorKm: "សំណើត្រូវបានបដិសេធដោយ ScienceKH Anti-Tamper Shield",
      errorEn: "Access denied by ScienceKH Security Policy.",
      incidentId,
    });
    return;
  }

  // 2. Detect Suspicious Sensitive File Probes (e.g. /.env, /wp-admin)
  if (SENSITIVE_PROBE_PATHS.test(requestUrl)) {
    const incidentId = `INC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    telegramAlertService.sendAlert({
      title: "⚠️ Malicious Path Probing / Reconnaissance",
      severity: "WARNING",
      event: "path_probe_blocked",
      ip,
      email,
      country,
      method: req.method,
      endpoint: requestUrl,
      userAgent,
      signature: "Sensitive File / Honeypot Probe",
      actionTaken: "HTTP 404 / 403 Blocked",
      details: { incidentId },
    });

    res.status(403).json({
      success: false,
      error: "Forbidden",
      errorKm: "ផ្លូវចូលត្រូវបានហាមឃាត់",
      errorEn: "Forbidden request path.",
      incidentId,
    });
    return;
  }

  // 3. Scan URL & Query Parameters
  const queryScan = scanObjectForThreats(req.query);
  if (queryScan) {
    const incidentId = `INC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    telegramAlertService.sendAlert({
      title: `🚨 ${queryScan.rule.name}`,
      severity: queryScan.rule.severity,
      event: `exploit_${queryScan.rule.category.toLowerCase()}`,
      ip,
      email,
      country,
      method: req.method,
      endpoint: requestUrl,
      userAgent,
      signature: queryScan.rule.name,
      payloadSnippet: queryScan.match,
      actionTaken: "HTTP 403 Forbidden (Dropped)",
      details: { incidentId },
    });

    res.status(403).json({
      success: false,
      error: "SecurityViolation",
      errorKm: "សំណើមានផ្ទុកទិន្នន័យគួរឱ្យសង្ស័យ និងត្រូវបានបញ្ឈប់ជាបន្ទាន់។",
      errorEn: "Request aborted due to detected exploit signature.",
      incidentId,
    });
    return;
  }

  // 4. Scan Request Body (if JSON or URL-encoded)
  if (req.body && typeof req.body === "object") {
    const bodyScan = scanObjectForThreats(req.body);
    if (bodyScan) {
      const incidentId = `INC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      telegramAlertService.sendAlert({
        title: `🚨 ${bodyScan.rule.name}`,
        severity: bodyScan.rule.severity,
        event: `exploit_${bodyScan.rule.category.toLowerCase()}`,
        ip,
        email,
        country,
        method: req.method,
        endpoint: requestUrl,
        userAgent,
        signature: bodyScan.rule.name,
        payloadSnippet: bodyScan.match,
        actionTaken: "HTTP 403 Forbidden (Dropped)",
        details: { incidentId },
      });

      res.status(403).json({
        success: false,
        error: "SecurityViolation",
        errorKm: "សំណើមានផ្ទុកទិន្នន័យគួរឱ្យសង្ស័យ និងត្រូវបានបញ្ឈប់ជាបន្ទាន់។",
        errorEn: "Request aborted due to detected exploit signature.",
        incidentId,
      });
      return;
    }
  }

  next();
}
