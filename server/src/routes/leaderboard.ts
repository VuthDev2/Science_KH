import { Router } from "express";
import { LeaderboardController } from "../controllers/leaderboard.controller.js";
import { cacheResponse } from "../config/redis.js";

export const leaderboardRouter = Router();

// Cache leaderboard standings for 30 seconds in browser/CDN
leaderboardRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=60");
  next();
});

// GET /api/leaderboard/standings (Cached on server for 30 seconds)
leaderboardRouter.get("/standings", cacheResponse(30), LeaderboardController.getStandings);
