import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.js";
import { sendVerificationCodeEmail } from "./mailer.js";
import { isAllowedEmailDomain, EMAIL_DOMAIN_ERROR_KM } from "../utils/email-validator.js";

interface HashedOtpRecord {
  codeHash: string; // HMAC-SHA256 hash of email:code
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

// In-memory cryptographically hashed OTP storage
const passwordResetOtpStore = new Map<string, HashedOtpRecord>();

// Clean up expired OTPs periodically (every 3 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [email, record] of passwordResetOtpStore.entries()) {
    if (now > record.expiresAt) {
      passwordResetOtpStore.delete(email);
    }
  }
}, 3 * 60 * 1000);

export class AuthService {
  /**
   * Compute constant-time verifiable HMAC-SHA256 hash for OTP
   */
  private static hashOtp(email: string, code: string): string {
    return crypto
      .createHmac("sha256", config.jwtSecret)
      .update(`${email.trim().toLowerCase()}:${code.trim()}`)
      .digest("hex");
  }

  /**
   * Compare two hex-encoded hashes in constant time to thwart timing attacks
   */
  private static timingSafeCompare(hashA: string, hashB: string): boolean {
    if (hashA.length !== hashB.length) return false;
    try {
      return crypto.timingSafeEqual(Buffer.from(hashA, "hex"), Buffer.from(hashB, "hex"));
    } catch {
      return false;
    }
  }

  /**
   * Initialize Supabase service-role client (if configured)
   */
  private static getAdminClient() {
    if (!config.supabase.url || !config.supabase.serviceRoleKey) {
      return null;
    }
    return createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  /**
   * Request a 6-digit OTP code sent to user email
   */
  static async requestResetOtp(email: string): Promise<{ success: boolean; message: string; cooldownSeconds?: number }> {
    const normalizedEmail = email.trim().toLowerCase();

    // Whitelist check: only @gmail.com and .edu.kh accepted
    if (!isAllowedEmailDomain(normalizedEmail)) {
      return {
        success: false,
        message: EMAIL_DOMAIN_ERROR_KM,
      };
    }

    const now = Date.now();
    const existing = passwordResetOtpStore.get(normalizedEmail);

    // Rate-limit: 60 seconds resend cooldown
    if (existing && now - existing.lastSentAt < 60 * 1000) {
      const waitTimeSec = Math.ceil((60 * 1000 - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        message: `សូមមេត្តារង់ចាំ ${waitTimeSec} វិនាទីមុនពេលស្នើសុំលេខកូដម្តងទៀត (Please wait before requesting another code)`,
        cooldownSeconds: waitTimeSec,
      };
    }

    // Generate cryptographically secure 6-digit OTP
    const rawOtp = crypto.randomInt(100000, 999999).toString();
    const codeHash = this.hashOtp(normalizedEmail, rawOtp);

    // Save with 10-minute expiry and attempt counter
    passwordResetOtpStore.set(normalizedEmail, {
      codeHash,
      expiresAt: now + 10 * 60 * 1000,
      attempts: 0,
      lastSentAt: now,
    });

    console.log(`[AuthService] Password reset OTP generated for ${normalizedEmail}: ${rawOtp} (Valid 10 mins)`);

    try {
      await sendVerificationCodeEmail(normalizedEmail, rawOtp, "សិស្ស ScienceKH");
      return {
        success: true,
        message: "លេខកូដសម្ងាត់ ៦ ខ្ទង់ត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នកហើយ។",
      };
    } catch (err) {
      console.error("[AuthService] Email sending error:", err);
      return {
        success: true,
        message: "លេខកូដសម្ងាត់ ៦ ខ្ទង់ត្រូវបានបង្កើត។ សូមពិនិត្យប្រអប់សំបុត្រ ឬ spam។",
      };
    }
  }

  /**
   * Verify OTP code without immediately resetting password (multi-step UI)
   */
  static verifyOtpOnly(email: string, code: string): { success: boolean; message: string; codeValid?: boolean } {
    const normalizedEmail = email.trim().toLowerCase();
    const record = passwordResetOtpStore.get(normalizedEmail);
    const now = Date.now();

    if (!record) {
      return {
        success: false,
        message: "មិនមានសំណើសុំលេខកូដសម្រាប់អ៊ីមែលនេះ ឬកូដបានផុតកំណត់ហើយ។",
      };
    }

    if (now > record.expiresAt) {
      passwordResetOtpStore.delete(normalizedEmail);
      return {
        success: false,
        message: "លេខកូដបានផុតកំណត់ហើយ។ សូមស្នើសុំកូដថ្មី។",
      };
    }

    if (record.attempts >= 5) {
      passwordResetOtpStore.delete(normalizedEmail);
      return {
        success: false,
        message: "អ្នកបានបញ្ចូលកូដខុសលើសពី ៥ ដង។ លេខកូដត្រូវបានលុបចោលដើម្បីសុវត្ថិភាព។",
      };
    }

    record.attempts += 1;
    const computedHash = this.hashOtp(normalizedEmail, code.trim());

    if (!this.timingSafeCompare(computedHash, record.codeHash)) {
      const remaining = 5 - record.attempts;
      return {
        success: false,
        message: `លេខកូដមិនត្រឹមត្រូវទេ។ អ្នកនៅសល់ឱកាសសាកល្បង ${remaining} ដង។`,
      };
    }

    return {
      success: true,
      codeValid: true,
      message: "លេខកូដផ្ទៀងផ្ទាត់ត្រឹមត្រូវ។",
    };
  }

  /**
   * Verify OTP and reset user password
   */
  static async verifyAndResetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    const verification = this.verifyOtpOnly(email, code);
    if (!verification.success) {
      return verification;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = this.getAdminClient();

    if (!admin) {
      passwordResetOtpStore.delete(normalizedEmail);
      return {
        success: true,
        message: "លេខកូដត្រឹមត្រូវ! (របៀបអភិវឌ្ឍន៍ Mock: ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរ)",
      };
    }

    try {
      const { data: usersData, error: listError } = await admin.auth.admin.listUsers();
      if (listError) throw listError;

      const user = usersData.users.find((u) => u.email?.toLowerCase() === normalizedEmail);
      if (!user) {
        return {
          success: false,
          message: "រកមិនឃើញគណនីដែលមានអ៊ីមែលនេះឡើយ។",
        };
      }

      const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
        password: newPassword,
      });

      if (updateError) throw updateError;

      // Shared Device Security: Invalidate all active sessions globally
      try {
        await admin.auth.admin.signOut(user.id, "global");
      } catch (err) {
        console.warn("[AuthService] Global session revocation notice:", err);
      }

      passwordResetOtpStore.delete(normalizedEmail);
      return {
        success: true,
        message: "ពាក្យសម្ងាត់ថ្មីរបស់អ្នកត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។",
      };
    } catch (err: any) {
      console.error("[AuthService] Supabase Admin update error:", err);
      return {
        success: false,
        message: err.message || "បរាជ័យក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់។",
      };
    }
  }
}

