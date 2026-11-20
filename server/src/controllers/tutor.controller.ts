import { Request, Response } from "express";
import crypto from "node:crypto";
import { TutorService } from "../services/tutor.service.js";
import { CacheService } from "../config/redis.js";

export class TutorController {
  static async streamChat(req: Request, res: Response) {
    const { message, gradeLevel = 12, subject = "physics", language = "km" } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // 1. Semantic Prompt Cache Key
    const normalizedMsg = (message || "").trim().toLowerCase();
    const promptHash = crypto.createHash("sha256").update(normalizedMsg).digest("hex").slice(0, 16);
    const cacheKey = `ai_cache:tutor:${gradeLevel}:${subject}:${language}:${promptHash}`;

    let responseText = await CacheService.get(cacheKey);

    if (!responseText) {
      responseText = TutorService.generateSocraticResponse({
        message,
        gradeLevel: Number(gradeLevel),
        subject,
        language: language as "km" | "en",
      });
      // Cache response for 48 hours (172800 seconds)
      await CacheService.set(cacheKey, responseText, 172800).catch(() => {});
    }

    const words = responseText.split(" ");
    for (let i = 0; i < words.length; i++) {
      res.write(`data: ${JSON.stringify({ chunk: words[i] + " " })}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }

    res.write("data: [DONE]\n\n");
    res.end();
  }
}

