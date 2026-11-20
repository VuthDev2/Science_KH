import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authOtpLimiter, authVerifyLimiter } from "../middleware/rate-limit.js";
import { validateBody } from "../validators/validator.middleware.js";
import {
  sendResetOtpSchema,
  verifyOtpOnlySchema,
  verifyResetOtpSchema,
} from "../validators/auth.validator.js";

export const authRouter = Router();

// POST /api/auth/forgot-password-otp - Generate & email 6-digit OTP
authRouter.post(
  "/forgot-password-otp",
  authOtpLimiter,
  validateBody(sendResetOtpSchema),
  AuthController.forgotPasswordOtp
);

// POST /api/auth/verify-otp-only - Validate OTP code without mutating password yet
authRouter.post(
  "/verify-otp-only",
  authVerifyLimiter,
  validateBody(verifyOtpOnlySchema),
  AuthController.verifyOtpOnly
);

// POST /api/auth/verify-reset-otp - Verify OTP and update password
authRouter.post(
  "/verify-reset-otp",
  authVerifyLimiter,
  validateBody(verifyResetOtpSchema),
  AuthController.verifyResetOtp
);
