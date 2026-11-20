import { Request, Response } from "express";
import cluster from "node:cluster";
import { config } from "../config/env.js";
import { sendSuccess, sendError } from "../types/api.js";
import { CacheService } from "../config/redis.js";
import { telegramAlertService } from "../services/telegram-alert.service.js";

export class HealthController {
  static getHealth(_req: Request, res: Response) {
    const now = new Date();
    const cambodiaTime = new Date().toLocaleString("en-US", {
      timeZone: config.cambodiaTimezone,
    });

    const memoryUsage = process.memoryUsage();

    return sendSuccess(res, {
      status: "ok",
      service: "ScienceKH API Server (Node.js + Express)",
      version: "1.0.0",
      uptimeSeconds: Math.floor(process.uptime()),
      environment: config.nodeEnv,
      process: {
        pid: process.pid,
        isClusterWorker: cluster.isWorker,
        workerId: cluster.isWorker && cluster.worker ? cluster.worker.id : "standalone",
        memoryRssMb: Math.round(memoryUsage.rss / (1024 * 1024)),
        memoryHeapUsedMb: Math.round(memoryUsage.heapUsed / (1024 * 1024)),
      },
      cache: {
        engine: CacheService.isRedis() ? "Redis (Distributed Cluster)" : "High-Speed In-Memory Fallback",
        redisConnected: CacheService.isRedis(),
      },
      security: {
        threatDetector: "active",
        rateLimiting: "active",
        telegramAlerts: telegramAlertService.isActive() ? "active" : "standby",
      },
      time: {
        utc: now.toISOString(),
        cambodiaIct: cambodiaTime,
        timezone: config.cambodiaTimezone,
      },
      gradesSupported: "Grades 7–12 (Junior High Brevet & Senior High BacII)",
    });
  }

  static async testTelegramAlert(_req: Request, res: Response) {
    const result = await telegramAlertService.testAlert();
    if (!result.success) {
      return sendError(res, result.message, 400);
    }
    return sendSuccess(res, {
      success: true,
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  }
}

