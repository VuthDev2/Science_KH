import { ApiClient } from "./client";

export class AuthApiService {
  /**
   * Request a 6-digit OTP code sent to user email for password reset
   */
  static async requestResetOtp(email: string) {
    return ApiClient.post<{ message: string }>("/api/auth/forgot-password-otp", {
      email,
    });
  }

  /**
   * Verify OTP code without mutating password yet
   */
  static async verifyOtpOnly(email: string, code: string) {
    return ApiClient.post<{ codeValid: boolean; message: string }>("/api/auth/verify-otp-only", {
      email,
      code,
    });
  }

  /**
   * Verify OTP and change password
   */
  static async verifyResetOtpAndSetPassword(email: string, code: string, newPassword: string) {
    return ApiClient.post<{ message: string }>("/api/auth/verify-reset-otp", {
      email,
      code,
      newPassword,
    });
  }
}

