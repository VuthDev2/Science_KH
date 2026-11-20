import { Router, Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { config } from "../config/env.js";
import { sendEmail, sendWelcomeEmail } from "../services/mailer.js";
import { allowedEmailSchema } from "../utils/email-validator.js";

export const mailRouter = Router();

/**
 * Constant-time string comparison using SHA-256 digest to neutralize side-channel timing attacks
 */
function timingSafeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

// Internal/Admin Guard: Prevents arbitrary public users from abusing mailer endpoints
function adminInternalGuard(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers["x-admin-key"] || req.headers["x-internal-secret"];
  const expectedSecret = config.jwtSecret;

  if (typeof adminKey !== "string" || !timingSafeEqualStrings(adminKey.trim(), expectedSecret.trim())) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Internal mailer endpoint restricted to authenticated system callers.",
    });
  }
  next();
}

mailRouter.use(adminInternalGuard);

const welcomeSchema = z.object({
  email: allowedEmailSchema,
  name: z.string().min(1).max(100).default("Student"),
});

mailRouter.post("/welcome", async (req, res, next) => {
  try {
    const { email, name } = welcomeSchema.parse(req.body);
    const result = await sendWelcomeEmail(email, name);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

const testSchema = z.object({
  email: allowedEmailSchema,
});

mailRouter.post("/test", async (req, res, next) => {
  try {
    const { email } = testSchema.parse(req.body);
    const result = await sendEmail({
      to: email,
      subject: "ScienceKH SMTP Configuration Test ✅",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>🎉 Nodemailer is working properly!</h2>
          <p>Your ScienceKH backend is successfully configured to send emails via SMTP.</p>
          <p>Time: ${new Date().toISOString()}</p>
        </div>
      `,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});
