// ==============================================================================
// ScienceKH — Enterprise Distributed Rate Limiting Middleware
// Backed by Redis (via rate-limit-redis) for cluster-wide anti-abuse protection
// with seamless automatic fallback to MemoryStore when Redis is offline.
// ==============================================================================

import {
  rateLimit,
  MemoryStore,
  type Store,
  type Options as RateLimitOptions,
  type IncrementResponse,
} from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import type { Request, Response } from "express";
import { CacheService } from "../config/redis.js";
import { telegramAlertService } from "../services/telegram-alert.service.js";

/**
 * Resilient Rate Limit Store that dynamically uses Redis when available,
 * and transparently falls back to Express in-memory store if Redis is unavailable.
 */
class ResilientRateLimitStore implements Store {
  public prefix: string;
  private memoryStore: MemoryStore;
  private redisStore: RedisStore | null = null;
  private options?: RateLimitOptions;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.memoryStore = new MemoryStore();
  }

  init(options: RateLimitOptions): void {
    this.options = options;
    if (this.memoryStore.init) {
      this.memoryStore.init(options);
    }
    this.tryInitRedis();
  }

  private tryInitRedis(): void {
    const client = CacheService.getRedisClient();
    if (client && !this.redisStore && this.options) {
      try {
        const store = new RedisStore({
          sendCommand: async (...args: string[]) => {
            const activeClient = CacheService.getRedisClient();
            if (!activeClient) throw new Error("Redis client unavailable");
            return (await activeClient.call(args[0], ...args.slice(1))) as any;
          },
          prefix: `rl:${this.prefix}:`,
        });
        if (store.init) {
          store.init(this.options);
        }
        this.redisStore = store;
      } catch {
        this.redisStore = null;
      }
    }
  }

  async increment(key: string): Promise<IncrementResponse> {
    this.tryInitRedis();
    if (this.redisStore) {
      try {
        return await this.redisStore.increment(key);
      } catch (err) {
        console.warn(`[RateLimit] Redis increment error on prefix "${this.prefix}", falling back to memory:`, err);
        this.redisStore = null;
      }
    }
    return this.memoryStore.increment(key);
  }

  async decrement(key: string): Promise<void> {
    this.tryInitRedis();
    if (this.redisStore) {
      try {
        await this.redisStore.decrement(key);
        return;
      } catch {
        this.redisStore = null;
      }
    }
    return this.memoryStore.decrement(key);
  }

  async resetKey(key: string): Promise<void> {
    this.tryInitRedis();
    if (this.redisStore) {
      try {
        await this.redisStore.resetKey(key);
        return;
      } catch {
        this.redisStore = null;
      }
    }
    return this.memoryStore.resetKey(key);
  }
}

/**
 * Creates a rate limit store with the specified prefix
 */
function createStore(prefix: string): Store {
  return new ResilientRateLimitStore(prefix);
}

/**
 * Helper to generate a 429 response and asynchronously trigger a Telegram alert
 */
function createAlertHandler(limiterName: string, message: Record<string, unknown>) {
  return (req: Request, res: Response): void => {
    telegramAlertService.sendRateLimitAlert(limiterName, req);
    res.status(429).json(message);
  };
}

/**
 * General API Rate Limiter
 * 200 requests per 15 minutes per IP
 */
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: createStore("general"),
  handler: createAlertHandler("general_api", {
    success: false,
    error: "Too Many Requests",
    errorKm: "អ្នកបានផ្ញើសំណើច្រើនដងពេក។ សូមរង់ចាំ ១៥ នាទីសិន។",
    errorEn: "Too many requests from this IP. Please try again after 15 minutes.",
  }),
});

/**
 * Strict Rate Limiter for OTP Requests (Prevents Mail Bombing & DoS)
 * Max 5 OTP requests per 15 minutes per IP
 */
export const authOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  store: createStore("otp"),
  handler: createAlertHandler("auth_otp", {
    success: false,
    error: "Too Many OTP Requests",
    errorKm: "អ្នកបានស្នើសុំលេខកូដច្រើនដងពេក។ ដើម្បីសុវត្ថិភាព សូមរង់ចាំ ១៥ នាទីសិន។",
    errorEn: "Too many verification code requests. For security, please wait 15 minutes.",
  }),
});

/**
 * Strict Rate Limiter for OTP Verification & Password Reset
 * Max 15 verification attempts per 15 minutes per IP
 */
export const authVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: createStore("verify"),
  handler: createAlertHandler("auth_verify", {
    success: false,
    error: "Too Many Verification Attempts",
    errorKm: "អ្នកបានព្យាយាមផ្ទៀងផ្ទាត់ច្រើនដងពេក។ សូមរង់ចាំ ១៥ នាទីសិន។",
    errorEn: "Too many verification attempts. Please wait 15 minutes before trying again.",
  }),
});

/**
 * Human-Speed Verification Rate Limiter (/api/exercises/verify)
 * Limits submissions to realistic human reading speeds (max 1 submission every 2 seconds)
 * Blocks automated scripts from spamming answers to farm XP or guess options.
 */
export const exerciseVerifyLimiter = rateLimit({
  windowMs: 2 * 1000,
  limit: 1,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: createStore("exercise"),
  handler: createAlertHandler("exercise_speed", {
    success: false,
    error: "SpeedLimitExceeded",
    errorKm: "អ្នកកំពុងឆ្លើយលឿនពេក។ សូមចំណាយពេលអានសំណួរយ៉ាងហោចណាស់ ២ វិនាទី។",
    errorEn: "Submissions too fast. Please take at least 2 seconds between answering questions.",
  }),
});

/**
 * AI Tutor Protection Rate Limiter (/api/tutor/chat)
 * Max 30 AI requests per minute per IP to protect LLM token quotas
 */
export const aiTutorLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: createStore("tutor"),
  handler: createAlertHandler("ai_tutor", {
    success: false,
    error: "AITutorRateLimitExceeded",
    errorKm: "អ្នកបានសួរសំណួរទៅកាន់លោកគ្រូ សុខា ច្រើនដងពេកក្នុងមួយនាទី។ សូមរង់ចាំបន្តិចសិន។",
    errorEn: "Too many AI Tutor questions asked in one minute. Please wait a moment before asking again.",
  }),
});

/**
 * Payment & KHQR Anti-Flooding Rate Limiter (/api/payments/*)
 * Max 10 QR code requests per minute per IP
 */
export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: createStore("payment"),
  handler: createAlertHandler("payment_requests", {
    success: false,
    error: "PaymentRateLimitExceeded",
    errorKm: "អ្នកបានស្នើសុំទូទាត់ច្រើនដងពេក។ សូមរង់ចាំ ១ នាទីសិន។",
    errorEn: "Too many payment requests. Please wait 1 minute before trying again.",
  }),
});
