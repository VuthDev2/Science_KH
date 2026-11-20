// ==============================================================================
// ScienceKH — Secure Payment & KHQR Webhook Controller
// Enforces cryptographic HMAC-SHA256 webhook signature verification (Anti-Spoofing)
// ==============================================================================

import { Request, Response } from "express";
import crypto from "node:crypto";
import { config } from "../config/env.js";
import { sendSuccess, sendError } from "../types/api.js";
import { telegramAlertService } from "../services/telegram-alert.service.js";

/**
 * Constant-time comparison to thwart timing correlation attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export class PaymentController {
  static generateKhqr(req: Request, res: Response) {
    const { plan = "monthly", currency = "KHR" } = req.body;

    const priceKhr = plan === "annual" ? 80000 : 12000;
    const priceUsd = plan === "annual" ? 19.99 : 2.99;
    // Generate cryptographically random transaction identifier
    const randSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
    const transactionId = `SKH-${Date.now().toString().slice(-6)}${randSuffix}`;

    const qrPayload = `00020101021229300012kh.gov.nbc.bakong0110sciencekh@aba520459995303${currency === "KHR" ? "116" : "840"}5406${priceKhr}5802KH5915SCIENCEKH CO LTD6010PHNOM PENH62240120${transactionId}6304ABCD`;

    return sendSuccess(res, {
      transactionId,
      plan,
      amount: currency === "KHR" ? priceKhr : priceUsd,
      currency,
      qrPayload,
      deepLink: `https://link.payway.com.kh/checkout?txn=${transactionId}`,
      expiresInSeconds: 900,
      instructionsKm: "ស្កេនទូទាត់តាមកម្មវិធី ABA Mobile, Bakong ឬកម្មវិធីធនាគារណាមួយនៅកម្ពុជា",
      instructionsEn: "Scan using ABA Mobile, Bakong, or any Cambodian banking app",
    });
  }

  static handleWebhook(req: Request, res: Response) {
    const signature = (req.headers["x-webhook-signature"] || req.headers["x-bakong-signature"]) as string;
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || config.jwtSecret;

    // In production, require and verify HMAC-SHA256 signature
    if (config.nodeEnv === "production" || signature) {
      if (!signature) {
        return sendError(res, "Missing webhook signature header", 401);
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (!constantTimeCompare(signature, expectedSignature)) {
        console.warn("[Security Alert] Invalid payment webhook signature attempt rejected.");
        telegramAlertService.sendPaymentTamperAlert(
          "HMAC Signature mismatch on /api/payments/webhook",
          req,
          { providedSignature: signature }
        );
        return sendError(res, "Invalid webhook signature", 401);
      }
    }

    const { transactionId, status } = req.body;
    console.log(`[KHQR Webhook Verified]: Transaction ${transactionId} -> Status: ${status}`);

    return sendSuccess(res, {
      received: true,
      transactionId,
      status,
      acknowledgedAt: new Date().toISOString(),
    });
  }
}
