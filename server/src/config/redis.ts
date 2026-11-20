// ==============================================================================
// ScienceKH — Enterprise Dual-Engine Cache Service (Redis + In-Memory Fallback)
// Provides sub-millisecond data caching, distributed rate limiting, and 
// real-time leaderboards (ZSET) with graceful zero-downtime memory fallback.
// ==============================================================================

import { Redis, type RedisOptions } from "ioredis";
import { config } from "./env.js";
import type { Request, Response, NextFunction } from "express";

interface MemoryItem {
  value: string;
  expiresAt: number | null; // null = never expires
}

interface SortedSetMember {
  member: string;
  score: number;
}

export class CacheService {
  private static redisClient: Redis | null = null;
  private static isConnected = false;
  private static connectionAttempted = false;
  private static fallbackStore = new Map<string, MemoryItem>();
  private static sortedSetsStore = new Map<string, SortedSetMember[]>();
  private static cleanupTimer: NodeJS.Timeout | null = null;

  /**
   * Initializes the Redis connection with non-blocking error handling.
   * If Redis is not available, gracefully falls back to the in-memory engine.
   */
  static init(): void {
    if (this.connectionAttempted) return;
    this.connectionAttempted = true;

    // Start in-memory periodic TTL cleanup every 60 seconds
    this.cleanupTimer = setInterval(() => {
      this.purgeExpiredMemoryKeys();
    }, 60_000);
    this.cleanupTimer.unref();

    if (!config.redis.enabled) {
      console.log("[Cache] Redis is explicitly disabled. Operating on in-memory engine.");
      return;
    }

    try {
      const options: RedisOptions = {
        lazyConnect: true,
        enableOfflineQueue: false,
        maxRetriesPerRequest: 1,
        connectTimeout: 2500,
        retryStrategy(times) {
          // If we cannot connect after 3 attempts, back off slowly
          if (times > 3) {
            return null; // Stop retrying automatically to avoid console spam
          }
          return Math.min(times * 500, 2000);
        },
      };

      if (config.redis.url) {
        this.redisClient = new Redis(config.redis.url, options);
      } else {
        this.redisClient = new Redis({
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password,
          ...options,
        });
      }

      this.redisClient.on("connect", () => {
        this.isConnected = true;
        console.log("⚡ [Cache] Redis client connected successfully.");
      });

      this.redisClient.on("ready", () => {
        this.isConnected = true;
        console.log("🚀 [Cache] Redis is ready for operations.");
      });

      this.redisClient.on("error", (err: Error) => {
        const wasConnected = this.isConnected;
        this.isConnected = false;
        if (wasConnected) {
          console.warn("⚠️ [Cache] Redis connection lost. Falling back to in-memory cache:", err.message);
        }
      });

      this.redisClient.on("close", () => {
        this.isConnected = false;
      });

      // Attempt initial connection asynchronously
      this.redisClient.connect().catch((err: Error) => {
        this.isConnected = false;
        console.log(
          `ℹ️ [Cache] Redis not available at ${config.redis.url || `${config.redis.host}:${config.redis.port}`}. Seamlessly using In-Memory Cache (${err.message}).`,
        );
      });
    } catch (err: unknown) {
      this.isConnected = false;
      const message = err instanceof Error ? err.message : String(err);
      console.warn("⚠️ [Cache] Redis initialization failed. Using in-memory fallback:", message);
    }
  }

  /**
   * Retrieves the raw Redis client (e.g. for passing to rate-limit-redis store)
   */
  static getRedisClient(): Redis | null {
    if (!this.connectionAttempted) {
      this.init();
    }
    return this.isConnected ? this.redisClient : null;
  }

  /**
   * Checks whether the active caching backend is Redis
   */
  static isRedis(): boolean {
    return this.isConnected && this.redisClient !== null;
  }

  /**
   * Fetches a raw string value by key
   */
  static async get(key: string): Promise<string | null> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        return await this.redisClient.get(key);
      } catch (err) {
        console.warn(`[Cache] Redis GET error for key "${key}", falling back to memory:`, err);
      }
    }

    // In-memory fallback
    const item = this.fallbackStore.get(key);
    if (!item) return null;
    if (item.expiresAt !== null && Date.now() > item.expiresAt) {
      this.fallbackStore.delete(key);
      return null;
    }
    return item.value;
  }

  /**
   * Stores a string value with optional TTL in seconds
   */
  static async set(key: string, value: string, ttlSeconds = config.redis.defaultTtlSeconds): Promise<void> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        if (ttlSeconds && ttlSeconds > 0) {
          await this.redisClient.set(key, value, "EX", ttlSeconds);
        } else {
          await this.redisClient.set(key, value);
        }
        return;
      } catch (err) {
        console.warn(`[Cache] Redis SET error for key "${key}", using memory fallback:`, err);
      }
    }

    // In-memory fallback
    const expiresAt = ttlSeconds && ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null;
    this.fallbackStore.set(key, { value, expiresAt });
  }

  /**
   * Fetches and parses a JSON item
   */
  static async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  /**
   * Serializes and sets a JSON item
   */
  static async setJson<T>(key: string, value: T, ttlSeconds = config.redis.defaultTtlSeconds): Promise<void> {
    const raw = JSON.stringify(value);
    await this.set(key, raw, ttlSeconds);
  }

  /**
   * Deletes a key
   */
  static async del(key: string): Promise<void> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        await this.redisClient.del(key);
        return;
      } catch (err) {
        console.warn(`[Cache] Redis DEL error for key "${key}":`, err);
      }
    }

    this.fallbackStore.delete(key);
    this.sortedSetsStore.delete(key);
  }

  /**
   * Deletes all keys matching a prefix or wildcard pattern (e.g. "exams:*")
   */
  static async delPattern(pattern: string): Promise<void> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        const stream = this.redisClient.scanStream({ match: pattern, count: 100 });
        const keysToDelete: string[] = [];
        for await (const resultKeys of stream) {
          keysToDelete.push(...(resultKeys as string[]));
        }
        if (keysToDelete.length > 0) {
          await this.redisClient.del(...keysToDelete);
        }
        return;
      } catch (err) {
        console.warn(`[Cache] Redis delPattern error for pattern "${pattern}":`, err);
      }
    }

    // In-memory pattern matching
    const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
    for (const key of this.fallbackStore.keys()) {
      if (regex.test(key)) {
        this.fallbackStore.delete(key);
      }
    }
    for (const key of this.sortedSetsStore.keys()) {
      if (regex.test(key)) {
        this.sortedSetsStore.delete(key);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Sorted Sets (ZSET) Operations for Gamification & Leaderboards
  // --------------------------------------------------------------------------

  /**
   * Adds or updates a member's score in a sorted set (e.g. leaderboard:grade:12)
   */
  static async zadd(key: string, score: number, member: string): Promise<number> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        return await this.redisClient.zadd(key, score, member);
      } catch (err) {
        console.warn(`[Cache] Redis ZADD error for key "${key}":`, err);
      }
    }

    // In-memory fallback
    const list = this.sortedSetsStore.get(key) || [];
    const existingIndex = list.findIndex((item) => item.member === member);
    let isNew = 0;

    if (existingIndex >= 0) {
      list[existingIndex].score = score;
    } else {
      list.push({ member, score });
      isNew = 1;
    }

    // Keep sorted descending by score
    list.sort((a, b) => b.score - a.score);
    this.sortedSetsStore.set(key, list);
    return isNew;
  }

  /**
   * Increments a member's score in a sorted set (ZINCRBY)
   */
  static async zincrby(key: string, increment: number, member: string): Promise<number> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        const result = await this.redisClient.zincrby(key, increment, member);
        return parseFloat(result);
      } catch (err) {
        console.warn(`[Cache] Redis ZINCRBY error for key "${key}":`, err);
      }
    }

    // In-memory fallback
    const list = this.sortedSetsStore.get(key) || [];
    const existing = list.find((item) => item.member === member);
    let newScore = increment;

    if (existing) {
      existing.score += increment;
      newScore = existing.score;
    } else {
      list.push({ member, score: increment });
    }

    list.sort((a, b) => b.score - a.score);
    this.sortedSetsStore.set(key, list);
    return newScore;
  }

  /**
   * Retrieves a member's rank in descending order (0 = 1st place)
   */
  static async zrevrank(key: string, member: string): Promise<number | null> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        const rank = await this.redisClient.zrevrank(key, member);
        return rank;
      } catch (err) {
        console.warn(`[Cache] Redis ZREVRANK error for key "${key}":`, err);
      }
    }

    // In-memory fallback
    const list = this.sortedSetsStore.get(key) || [];
    const index = list.findIndex((item) => item.member === member);
    return index >= 0 ? index : null;
  }

  /**
   * Retrieves members with scores in descending order between start and stop (e.g. 0 to 49 for Top 50)
   */
  static async zrevrangeWithScores(
    key: string,
    start: number,
    stop: number,
  ): Promise<SortedSetMember[]> {
    if (!this.connectionAttempted) this.init();

    if (this.isRedis() && this.redisClient) {
      try {
        const raw = await this.redisClient.zrevrange(key, start, stop, "WITHSCORES");
        const results: SortedSetMember[] = [];
        for (let i = 0; i < raw.length; i += 2) {
          results.push({
            member: raw[i],
            score: parseFloat(raw[i + 1]),
          });
        }
        return results;
      } catch (err) {
        console.warn(`[Cache] Redis ZREVRANGE error for key "${key}":`, err);
      }
    }

    // In-memory fallback
    const list = this.sortedSetsStore.get(key) || [];
    const actualStop = stop === -1 ? list.length : stop + 1;
    return list.slice(start, actualStop);
  }

  /**
   * Purges expired entries from the fallback memory store
   */
  private static purgeExpiredMemoryKeys(): void {
    const now = Date.now();
    for (const [key, item] of this.fallbackStore.entries()) {
      if (item.expiresAt !== null && now > item.expiresAt) {
        this.fallbackStore.delete(key);
      }
    }
  }

  /**
   * Gracefully shuts down cache connections
   */
  static async disconnect(): Promise<void> {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    if (this.redisClient) {
      try {
        await this.redisClient.quit();
      } catch {
        this.redisClient.disconnect();
      }
      this.redisClient = null;
      this.isConnected = false;
    }
  }
}

/**
 * Express Middleware for Caching JSON responses (Cache-Aside Pattern)
 * Example usage on static or read-heavy endpoints:
 *   router.get("/bacii", cacheResponse(3600), ExamController.getBacIIExams);
 */
export function cacheResponse(ttlSeconds = 3600, keyGenerator?: (req: Request) => string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = keyGenerator ? keyGenerator(req) : `http_cache:${req.originalUrl || req.url}`;

    try {
      const cachedBody = await CacheService.get(cacheKey);
      if (cachedBody) {
        res.setHeader("X-Cache", "HIT");
        res.setHeader("X-Cache-Engine", CacheService.isRedis() ? "Redis" : "Memory-Fallback");
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(cachedBody);
        return;
      }

      // Intercept the res.send / res.json method to capture and store the payload
      res.setHeader("X-Cache", "MISS");
      res.setHeader("X-Cache-Engine", CacheService.isRedis() ? "Redis" : "Memory-Fallback");

      const originalSend = res.send.bind(res);
      res.send = ((body: unknown) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const bodyStr = typeof body === "string" ? body : JSON.stringify(body);
          CacheService.set(cacheKey, bodyStr, ttlSeconds).catch((err) => {
            console.warn(`[Cache Middleware] Failed to cache key "${cacheKey}":`, err);
          });
        }
        return originalSend(body);
      }) as Response["send"];

      return next();
    } catch (err) {
      console.warn(`[Cache Middleware] Error processing cache key "${cacheKey}":`, err);
      return next();
    }
  };
}
