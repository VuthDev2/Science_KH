import { Router } from "express";
import { VocabController } from "../controllers/vocab.controller.js";
import { cacheResponse } from "../config/redis.js";

export const vocabRouter = Router();

// Cache read-only vocabulary decks in browser/CDN for 5 minutes
vocabRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
  next();
});

// GET /api/vocab/decks (Cached on server for 1 hour)
vocabRouter.get("/decks", cacheResponse(3600), VocabController.getDecks);
