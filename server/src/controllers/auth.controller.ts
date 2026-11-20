import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { sendSuccess, sendError } from "../types/api.js";

export class AuthController {
  static async forgotPasswordOtp(req: Request, res: Response) {
    const { email } = req.body;
    const result = await AuthService.requestResetOtp(email);

    if (!result.success) {
      return sendError(res, result.message, 429, { cooldownSeconds: result.cooldownSeconds });
    }

    return sendSuccess(res, { message: result.message });
  }

  static verifyOtpOnly(req: Request, res: Response) {
    const { email, code } = req.body;
    const result = AuthService.verifyOtpOnly(email, code);

    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, { codeValid: true, message: result.message });
  }

  static async verifyResetOtp(req: Request, res: Response) {
    const { email, code, newPassword } = req.body;
    const result = await AuthService.verifyAndResetPassword(email, code, newPassword);

    if (!result.success) {
      return sendError(res, result.message, 400);
    }

    return sendSuccess(res, { message: result.message });
  }
}

