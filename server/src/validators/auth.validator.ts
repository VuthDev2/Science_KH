import { z } from "zod";
import { allowedEmailSchema } from "../utils/email-validator.js";

export const sendResetOtpSchema = z.object({
  email: allowedEmailSchema,
});

export const verifyOtpOnlySchema = z.object({
  email: allowedEmailSchema,
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});

export const verifyResetOtpSchema = z.object({
  email: allowedEmailSchema,
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must be exactly 6 digits"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(72, "Password too long"),
});

export const loginSchema = z.object({
  email: allowedEmailSchema,
  password: z.string().min(1, "Password required"),
});
