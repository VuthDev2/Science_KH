import { z } from "zod";

export const gradeParamSchema = z.object({
  gradeId: z.coerce.number().int().min(7).max(12),
});

export const lessonsParamSchema = z.object({
  grade: z.coerce.number().int().min(7).max(12),
  subject: z.string().min(1),
});

export const tutorChatSchema = z.object({
  message: z.string().min(1, "Message is required").max(1000, "Message too long"),
  gradeLevel: z.number().int().min(7).max(12).default(12),
  subject: z.string().default("physics"),
  language: z.enum(["km", "en"]).default("km"),
});

export const exerciseVerifySchema = z.object({
  lessonId: z.string().min(1),
  questionId: z.string().min(1),
  selectedIndex: z.number().int().min(0).max(5),
});

