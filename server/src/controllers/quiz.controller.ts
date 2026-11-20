import { Request, Response } from "express";
import { QuizService } from "../services/quiz.service.js";
import { sendSuccess, sendError } from "../types/api.js";

export class QuizController {
  static getGamificationStatus(_req: Request, res: Response) {
    const data = QuizService.getGamificationStatus();
    return sendSuccess(res, data.student, 200, { timezone: data.timezone });
  }

  static refillHeartsWithCoins(req: Request, res: Response) {
    const coinsCost = req.body.coinsCost ?? 20;
    const result = QuizService.refillHeartsWithCoins(coinsCost);

    if (!result.success) {
      return sendError(res, result.message || "Failed to refill hearts", 400);
    }

    return sendSuccess(res, result.data);
  }

  static submitQuiz(req: Request, res: Response) {
    const { lessonId, answers, gradeLevel, subject } = req.body;
    const result = QuizService.processSubmission({
      lessonId,
      gradeLevel,
      subject,
      answers,
    });

    return sendSuccess(res, result);
  }
}
