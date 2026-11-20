import dotenv from "dotenv";
import path from "node:path";

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

export const config = {
  port: Number(process.env.PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:8080",
  supabase: {
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
    publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    openAiApiKey: process.env.OPENAI_API_KEY || "",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || '"ScienceKH (វិទ្យាសាស្ត្រ)" <noreply@sciencekh.edu.kh>',
  },
  jwtSecret: process.env.JWT_SECRET || "sciencekh_dev_secret_key_2026",
  cambodiaTimezone: "Asia/Phnom_Penh",
  redis: {
    url: process.env.REDIS_URL || "",
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    defaultTtlSeconds: Number(process.env.REDIS_DEFAULT_TTL) || 3600, // 1 hour
    enabled: process.env.REDIS_ENABLED !== "false",
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_SECURITY_CHAT_ID || "",
    enabled:
      process.env.TELEGRAM_ALERTS_ENABLED === "true" ||
      Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_SECURITY_CHAT_ID),
    rateLimitSeconds: Number(process.env.TELEGRAM_ALERT_RATE_LIMIT_SECONDS) || 30, // Anti-flooding cooldown
  },
};

