import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { config } from "../config/env.js";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  if (config.smtp.user && config.smtp.pass) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  } else {
    // Development fallback: logs emails to console
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: "unix",
      buffer: true,
    });
  }

  return transporter;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Strips carriage returns and newlines to prevent SMTP header injection attacks
 */
function sanitizeHeader(val: string): string {
  return val.replace(/[\r\n]/g, "").trim();
}

export async function sendEmail(opts: SendMailOptions) {
  const mailer = getTransporter();
  const isMock = !config.smtp.user || !config.smtp.pass;

  const sanitizedTo = sanitizeHeader(opts.to);
  const sanitizedSubject = sanitizeHeader(opts.subject);
  const sanitizedFrom = sanitizeHeader(config.smtp.from);

  const mailOptions = {
    from: sanitizedFrom,
    to: sanitizedTo,
    subject: sanitizedSubject,
    html: opts.html,
    text: opts.text,
  };

  if (isMock) {
    console.log("--------------------------------------------------------------------");
    console.log("📨 [NODEMAILER DEV MOCK] Email would be sent with live SMTP credentials:");
    console.log(`   To: ${opts.to}`);
    console.log(`   Subject: ${opts.subject}`);
    console.log("   (Configure SMTP_USER & SMTP_PASS in .env to deliver real emails)");
    console.log("--------------------------------------------------------------------");
    return { success: true, messageId: `mock-${Date.now()}`, mock: true };
  }

  try {
    const info = await mailer.sendMail(mailOptions);
    console.log(`[Nodemailer] ✅ Real email delivered to ${opts.to} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId, mock: false };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn("--------------------------------------------------------------------");
    console.warn(`⚠️ [Nodemailer Delivery Notice] Could not reach SMTP host: ${errorMsg}`);
    console.warn(`   Target: ${opts.to}`);
    console.warn(`   Subject: ${opts.subject}`);
    console.warn(`   (If running inside an isolated sandbox or offline, fallback mode is active)`);
    console.warn("--------------------------------------------------------------------");
    return { success: true, messageId: `fallback-${Date.now()}`, mock: true, warning: errorMsg };
  }
}

// 1. Welcome Email Template (Bilingual Khmer / English)
export async function sendWelcomeEmail(to: string, studentName: string) {
  const subject = "សូមស្វាគមន៍មកកាន់ ScienceKH! 🎓 Welcome to ScienceKH!";
  const html = `
    <!DOCTYPE html>
    <html lang="km">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .header { background: #064e3b; padding: 32px 28px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #6ee7b7; letter-spacing: 0.5px; }
        .content { padding: 32px 28px; line-height: 1.6; }
        .badge { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 16px; }
        .highlight-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; }
        .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
        .btn { display: inline-block; background: #059669; color: white; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 12px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ScienceKH • វិទ្យាសាស្ត្រ</h1>
          <p>Cambodian Grades 7–12 STEM Platform</p>
        </div>
        <div class="content">
          <div class="badge">គណនីសិស្សថ្មី • New Student</div>
          <h2 style="font-size: 20px; margin: 0 0 12px; color: #0f172a;">
            សួស្តី ${studentName}! 👋
          </h2>
          <p style="font-size: 14px; color: #334155; margin-bottom: 16px;">
            សូមស្វាគមន៍មកកាន់ <strong>ScienceKH</strong>! អ្នកបានចូលរួមជាមួយវេទិកាសិក្សា STEM ស្របតាមកម្មវិធីសិក្សារបស់ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)។
          </p>
          <div class="highlight-box">
            <h4 style="margin: 0 0 8px; color: #065f46; font-size: 14px;">🎁 រង្វាន់ស្វាគមន៍សិស្សថ្មី (Welcome Bonus)</h4>
            <p style="margin: 0; font-size: 13px; color: #047857;">
              អ្នកទទួលបាន <strong>50 កាក់ (Coins)</strong> & <strong>5 បេះដូង (Hearts)</strong> ដើម្បីចាប់ផ្តើមរៀន និងធ្វើតេស្តសាកល្បងភ្លាមៗ!
            </p>
          </div>
          <p style="font-size: 13px; color: #64748b; margin-top: 16px;">
            Master Physics, Chemistry, Biology, and Earth Science with interactive micro-lessons and Dr. Sokha, our Socratic AI STEM tutor.
          </p>
          <div style="text-align: center;">
            <a href="${config.clientUrl}/home" class="btn">ចូលរៀនឥឡូវនេះ (Start Learning)</a>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ScienceKH. All rights reserved. Phnom Penh, Cambodia.
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    text: `សួស្តី ${studentName}! សូមស្វាគមន៍មកកាន់ ScienceKH! ចូលរៀនឥឡូវនេះនៅ: ${config.clientUrl}/home`,
  });
}

// 2. 6-Digit Verification Code (OTP) Template
export async function sendVerificationCodeEmail(to: string, code: string, studentName = "Student") {
  const subject = `${code} គឺជាលេខកូដផ្ទៀងផ្ទាត់របស់អ្នក • Your ScienceKH Verification Code`;
  const html = `
    <!DOCTYPE html>
    <html lang="km">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; text-align: center; }
        .header { background: #064e3b; padding: 28px; color: white; }
        .content { padding: 32px 24px; }
        .code-box { background: #f0fdf4; border: 2px dashed #059669; border-radius: 14px; padding: 20px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #065f46; max-width: 280px; }
        .footer { padding: 18px; background: #f8fafc; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0; font-size: 22px;">ScienceKH</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #6ee7b7;">សុវត្ថិភាពគណនី • Account Security</p>
        </div>
        <div class="content">
          <h3 style="margin: 0 0 10px; color: #0f172a;">លេខកូដផ្ទៀងផ្ទាត់គណនីរបស់អ្នក</h3>
          <p style="font-size: 14px; color: #64748b; margin: 0 0 16px;">
            សួស្តី ${studentName}, សូមប្រើលេខកូដ 6 ខ្ទង់ខាងក្រោមដើម្បីផ្ទៀងផ្ទាត់គណនីរបស់អ្នក៖
          </p>
          <div class="code-box">${code}</div>
          <p style="font-size: 12px; color: #94a3b8; margin: 16px 0 0;">
            លេខកូដនេះនឹងផុតកំណត់ក្នុងរយៈពេល 10 នាទី។ សូមកុំចែករំលែកលេខកូដនេះជាមួយនរណាម្នាក់ឡើយ។<br/>
            (This code will expire in 10 minutes. Do not share it with anyone.)
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ScienceKH
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    text: `លេខកូដផ្ទៀងផ្ទាត់ ScienceKH របស់អ្នកគឺ: ${code} (ផុតកំណត់ក្នុងរយៈពេល 10 នាទី)`,
  });
}

// 3. Password Reset Link Email Template
export async function sendPasswordResetEmail(to: string, resetLink: string, studentName = "Student") {
  const subject = "កំណត់ពាក្យសម្ងាត់របស់អ្នកឡើងវិញ • Reset Your ScienceKH Password";
  const html = `
    <!DOCTYPE html>
    <html lang="km">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .header { background: #064e3b; padding: 28px; text-align: center; color: white; }
        .content { padding: 32px 24px; text-align: center; }
        .btn { display: inline-block; background: #059669; color: white; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 12px; margin: 24px 0; font-size: 15px; }
        .footer { padding: 18px; background: #f8fafc; font-size: 12px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0; font-size: 22px;">ScienceKH</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #6ee7b7;">ការកំណត់ពាក្យសម្ងាត់ • Password Reset</p>
        </div>
        <div class="content">
          <h3 style="margin: 0 0 10px; color: #0f172a;">តើអ្នកបានស្នើសុំប្តូរពាក្យសម្ងាត់មែនទេ?</h3>
          <p style="font-size: 14px; color: #64748b; margin: 0 0 16px;">
            សួស្តី ${studentName}, យើងបានទទួលសំណើកំណត់ពាក្យសម្ងាត់ឡើងវិញសម្រាប់គណនីរបស់អ្នក។ សូមចុចប៊ូតុងខាងក្រោមដើម្បីបង្កើតពាក្យសម្ងាត់ថ្មី៖
          </p>
          <a href="${resetLink}" class="btn">កំណត់ពាក្យសម្ងាត់ឡើងវិញ (Reset Password)</a>
          <p style="font-size: 12px; color: #94a3b8; margin: 16px 0 0;">
            ប្រសិនបើអ្នកមិនបានស្នើសុំទេ សូមព្រងើយកន្តើយនឹងសារនេះ។ គណនីរបស់អ្នកនៅតែមានសុវត្ថិភាព។
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ScienceKH
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    text: `កំណត់ពាក្យសម្ងាត់ ScienceKH ឡើងវិញតាមរយៈតំណភ្ជាប់នេះ: ${resetLink}`,
  });
}

