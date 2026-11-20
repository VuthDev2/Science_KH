// ==============================================================================
// ScienceKH — Payment & KHQR Input Validation Schemas
// Enforces strict types and limits to prevent injection or parameter tampering
// ==============================================================================

import { z } from "zod";

export const generateKhqrSchema = z.object({
  plan: z.enum(["monthly", "annual"]).default("monthly"),
  currency: z.enum(["KHR", "USD"]).default("KHR"),
});

export const paymentWebhookSchema = z.object({
  transactionId: z
    .string()
    .trim()
    .regex(/^SKH-[0-9a-zA-Z_-]{4,32}$/, "Invalid transaction ID format"),
  status: z.enum(["SUCCESS", "PAID", "FAILED", "PENDING", "CANCELLED"]),
  amount: z.number().positive().optional(),
  currency: z.enum(["KHR", "USD"]).optional(),
});
