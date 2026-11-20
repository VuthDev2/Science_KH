import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/env.js";
import { CacheService } from "./config/redis.js";
import { LeaderboardService } from "./services/leaderboard.service.js";
import { errorHandler } from "./middleware/error-handler.js";
import { generalApiLimiter } from "./middleware/rate-limit.js";
import {
  hppSanitizer,
  inputSanitizer,
  extraSecurityHeaders,
} from "./middleware/security.js";
import { threatDetector } from "./middleware/threat-detector.js";
import { telegramAlertService } from "./services/telegram-alert.service.js";
import { healthRouter } from "./routes/health.js";
import { curriculumRouter } from "./routes/curriculum.js";
import { quizRouter } from "./routes/quiz.js";
import { examsRouter } from "./routes/exams.js";
import { leaderboardRouter } from "./routes/leaderboard.js";
import { vocabRouter } from "./routes/vocab.js";
import { tutorRouter } from "./routes/tutor.js";
import { paymentsRouter } from "./routes/payments.js";
import { mailRouter } from "./routes/mail.js";
import { authRouter } from "./routes/auth.js";
import { exercisesRouter } from "./routes/exercises.js";

const app = express();

// Trust reverse proxy (e.g. Render, Cloudflare, Nginx) for accurate client IP detection in rate limiting
app.set("trust proxy", 1);

// Hide Express fingerprinting
app.disable("x-powered-by");

// 0. Anti-SSL-Stripping: Force Permanent 301 HTTPS Redirection in production
app.use((req, res, next) => {
  if (config.nodeEnv === "production") {
    const proto = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
    const isLocalhost =
      req.hostname === "localhost" ||
      req.hostname === "127.0.0.1" ||
      req.hostname.endsWith(".local");
    if (proto !== "https" && !isLocalhost) {
      res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
  }
  next();
});

// 1. Helmet Security Headers (MIME nosniff, Frameguard, XSS filter, 2-Year Preloaded HSTS, CSP upgrade-insecure-requests)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 63072000, // 2 years in seconds (required for HSTS preload list eligibility)
      includeSubDomains: true, // Apply to all *.sciencekh.edu.kh subdomains
      preload: true, // Submit to global HSTS Preload list (Chrome, Safari, Firefox, Edge)
    },
  })
);

// 2. Strict CORS Configuration
const ALLOWED_ORIGINS = new Set([
  config.clientUrl,
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:3000",
  "http://localhost:5173",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || ALLOWED_ORIGINS.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin blocked by ScienceKH Security Policy"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-Admin-Key"],
    maxAge: 86400, // 24 hours preflight cache
  })
);

// 3. Request Body Size Limits to Prevent Denial of Service
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));

// 3.1. Deep Input Sanitization, HPP Defense & Extra Security Headers
app.use(hppSanitizer);
app.use(inputSanitizer);
app.use(extraSecurityHeaders);
app.use(threatDetector);

// 4. Request Logging (sanitized: hides passwords/tokens)
app.use((req, _res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

// 5. Global API Rate Limiting (200 requests / 15 minutes)
app.use("/api", generalApiLimiter);

// 6. API Route Handlers
app.use("/api/health", healthRouter);
app.use("/api/curriculum", curriculumRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/exams", examsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/vocab", vocabRouter);
app.use("/api/tutor", tutorRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/mail", mailRouter);
app.use("/api/auth", authRouter);
app.use("/api/exercises", exercisesRouter);

// Root fallback
app.get("/", (_req, res) => {
  res.json({
    name: "ScienceKH API Server (Node.js + Express)",
    description: "Bilingual STEM education API for Cambodian Students Grades 7–12",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// 7. Centralized, Production-Safe Error Handler
app.use(errorHandler);

// Initialize Redis / In-Memory Cache engine & seed real-time leaderboard
CacheService.init();
LeaderboardService.seedIfEmpty().catch((err) => {
  console.warn("[Leaderboard] Initial seed notice:", err);
});

// Start server
const server = app.listen(config.port, () => {
  console.log(`\n🚀 ScienceKH Secure Backend running at: http://localhost:${config.port}`);
  console.log(`📡 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`🛡️  Security: Helmet active, Rate Limiting active, Threat Detector active`);
  console.log(`📱 Telegram Alerts: ${telegramAlertService.isActive() ? "Active (Online)" : "Standby (Awaiting Bot Token & Chat ID in .env)"}`);
  console.log(`⚡ Cache Engine: ${CacheService.isRedis() ? "Redis (Connected)" : "High-Speed Memory Fallback"}`);
  console.log(`🇰🇭 Timezone set to: ${config.cambodiaTimezone}\n`);
});

// Graceful process termination
const handleGracefulShutdown = async (signal: string) => {
  console.log(`\n[Process] Received ${signal}. Shutting down server gracefully...`);
  server.close(async () => {
    await CacheService.disconnect();
    console.log("[Process] Closed HTTP server and disconnected cache engine.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));

export default app;
