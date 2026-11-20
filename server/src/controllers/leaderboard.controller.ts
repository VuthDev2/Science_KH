import { Request, Response } from "express";
import { LeaderboardService } from "../services/leaderboard.service.js";
import { sendSuccess } from "../types/api.js";

export class LeaderboardController {
  static getStandings(req: Request, res: Response) {
    const province = typeof req.query.province === "string" ? req.query.province : undefined;
    const grade = typeof req.query.grade === "string" ? Number(req.query.grade) : undefined;

    const data = LeaderboardService.getStandings({ province, grade });
    return sendSuccess(res, data.standings, 200, {
      league: data.league,
      resetInHours: data.resetInHours,
      totalParticipants: data.totalParticipants,
      promotionThreshold: data.promotionThreshold,
      demotionThreshold: data.demotionThreshold,
    });
  }
}

