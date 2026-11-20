import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller.js";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.js";
import { validateBody } from "../validators/validator.middleware.js";
import { quizSubmissionSchema, purchaseHeartSchema } from "../validators/quiz.validator.js";

export const quizRouter = Router();

// GET /api/quiz/gamification-status
quizRouter.get("/gamification-status", optionalAuthMiddleware, QuizController.getGamificationStatus);

// POST /api/quiz/refill-hearts - Purchase 1 heart with coins
quizRouter.post("/refill-hearts", optionalAuthMiddleware, validateBody(purchaseHeartSchema), QuizController.refillHeartsWithCoins);

// POST /api/quiz/submit - Evaluate answers, streak, hearts, and XP
quizRouter.post("/submit", optionalAuthMiddleware, validateBody(quizSubmissionSchema), QuizController.submitQuiz);
