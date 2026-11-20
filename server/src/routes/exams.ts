import { Router } from "express";
import { ExamController } from "../controllers/exam.controller.js";
import { cacheResponse } from "../config/redis.js";

export const examsRouter = Router();

// Cache read-only past exams list in browser/CDN for 5 minutes
examsRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
  next();
});

// GET /api/exams - List past BacII & Brevet exams with optional filters (Cached for 1 hour)
examsRouter.get("/", cacheResponse(3600), ExamController.getExams);

// GET /api/exams/:id - Specific exam paper details (Cached for 2 hours)
examsRouter.get("/:id", cacheResponse(7200), ExamController.getExamById);
