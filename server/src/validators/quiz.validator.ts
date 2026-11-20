import { z } from "zod";

export const quizSubmissionSchema = z.object({
  lessonId: z.string().min(1, "lessonId is required"),
  gradeLevel: z.number().int().min(7).max(12).optional(),
  subject: z.string().optional(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOptionId: z.string(),
      isCorrect: z.boolean(),
    })
  ).min(1, "At least one answer must be submitted"),
});

export const purchaseHeartSchema = z.object({
  coinsCost: z.number().int().positive().default(20),
});

