import { Router } from "express";
import { CurriculumController } from "../controllers/curriculum.controller.js";
import { validateParams } from "../validators/validator.middleware.js";
import { gradeParamSchema, lessonsParamSchema } from "../validators/curriculum.validator.js";
import { cacheResponse } from "../config/redis.js";

export const curriculumRouter = Router();

// Cache read-only curriculum queries in browser/CDN for 5 minutes (stale-while-revalidate 10 minutes)
curriculumRouter.use((_req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
  next();
});

// GET /api/curriculum/grades - List all 6 grades with subjects (Cached for 1 hour)
curriculumRouter.get("/grades", cacheResponse(3600), CurriculumController.getGrades);

// GET /api/curriculum/grade/:gradeId - Specific grade details (Cached for 1 hour)
curriculumRouter.get(
  "/grade/:gradeId",
  validateParams(gradeParamSchema),
  cacheResponse(3600),
  CurriculumController.getGradeById,
);

// GET /api/curriculum/lessons/:grade/:subject - Units & lessons (Cached for 1 hour)
curriculumRouter.get(
  "/lessons/:grade/:subject",
  validateParams(lessonsParamSchema),
  cacheResponse(3600),
  CurriculumController.getLessonsByGradeAndSubject,
);
