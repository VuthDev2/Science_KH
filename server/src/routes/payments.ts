import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { paymentLimiter } from "../middleware/rate-limit.js";
import { validateBody } from "../validators/validator.middleware.js";
import { generateKhqrSchema, paymentWebhookSchema } from "../validators/payment.validator.js";

export const paymentsRouter = Router();

// POST /api/payments/generate-khqr - Generate Bakong KHQR with rate limiting
paymentsRouter.post(
  "/generate-khqr",
  paymentLimiter,
  validateBody(generateKhqrSchema),
  PaymentController.generateKhqr,
);

// POST /api/payments/webhook - Verified webhook receiver
paymentsRouter.post(
  "/webhook",
  paymentLimiter,
  validateBody(paymentWebhookSchema),
  PaymentController.handleWebhook,
);
