import { Router } from "express";
import { ExerciseController } from "../controllers/exercise.controller.js";
import { exerciseVerifyLimiter } from "../middleware/rate-limit.js";
import { validateBody } from "../validators/validator.middleware.js";
import { exerciseVerifySchema } from "../validators/curriculum.validator.js";

export const exercisesRouter = Router();

// GET /api/exercises/lesson/:lessonId - Fetch questions for a lesson (answers stripped)
exercisesRouter.get("/lesson/:lessonId", ExerciseController.getQuestionsByLesson);

// POST /api/exercises/verify - Verify student's selected answer against server-only answer key
exercisesRouter.post(
  "/verify",
  exerciseVerifyLimiter,
  validateBody(exerciseVerifySchema),
  ExerciseController.verifyAnswer
);
