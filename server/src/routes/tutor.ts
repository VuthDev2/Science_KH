import { Router } from "express";
import { TutorController } from "../controllers/tutor.controller.js";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.js";
import { validateBody } from "../validators/validator.middleware.js";
import { tutorChatSchema } from "../validators/curriculum.validator.js";
import { aiTutorLimiter } from "../middleware/rate-limit.js";

export const tutorRouter = Router();

// POST /api/tutor/chat - Socratic AI Stream with anti-abuse rate limiter
tutorRouter.post(
  "/chat",
  aiTutorLimiter,
  optionalAuthMiddleware,
  validateBody(tutorChatSchema),
  TutorController.streamChat,
);
