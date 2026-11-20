import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.js";
import { CacheService } from "../config/redis.js";

export type UserRole = "student" | "editor" | "admin";

export interface AuthenticatedUser {
  id: string;
  email?: string;
  fullName: string;
  gradeLevel: number;
  role: UserRole;
  isDemo?: boolean;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// Initialize server-side Supabase client for JWT verification
const supabase = createClient(
  config.supabase.url || "https://placeholder.supabase.co",
  config.supabase.serviceRoleKey || config.supabase.publishableKey || "placeholder",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// High-performance in-memory cache for validated tokens (TTL: 60 seconds)
interface CachedTokenSession {
  user: AuthenticatedUser;
  cachedAt: number;
}
const tokenCache = new Map<string, CachedTokenSession>();
const TOKEN_CACHE_TTL_MS = 60 * 1000;

// Periodic cleanup of expired token sessions (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [token, item] of tokenCache.entries()) {
    if (now - item.cachedAt > TOKEN_CACHE_TTL_MS) {
      tokenCache.delete(token);
    }
  }
}, 5 * 60 * 1000);

/**
 * Robust JWT Authentication Middleware
 * Validates Supabase JWTs with cryptographic verification and in-memory caching.
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
      messageKm: "សូមចូលប្រើប្រាស់ដើម្បីបន្ត (Authentication required)",
      messageEn: "Authentication required. Please provide a Bearer token.",
    });
  }

  const token = authHeader.split(" ")[1]?.trim();
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      messageKm: "Token មិនត្រឹមត្រូវ",
      messageEn: "Invalid authorization header format.",
    });
  }

  // 1. Dev / preview test user fallback (strictly disabled in production)
  if (config.nodeEnv !== "production") {
    if (token === "00000000-0000-0000-0000-000000000001" || token === "demo-token") {
      req.user = {
        id: "00000000-0000-0000-0000-000000000001",
        email: "demo.student@sciencekh.edu",
        fullName: "សិស្សគំរូ ScienceKH (Demo Student)",
        gradeLevel: 12,
        role: "student",
        isDemo: true,
      };
      return next();
    }
  }

  const tokenKey = token.slice(-32);

  // 2. Check token revocation blacklist (e.g. from shared lab logout or password reset)
  const isBlacklisted = await CacheService.get(`blacklist:token:${tokenKey}`);
  if (isBlacklisted) {
    return res.status(401).json({
      error: "SessionRevoked",
      messageKm: "សម័យប្រជុំត្រូវបានបញ្ចប់ សូមចូលប្រើប្រាស់ម្តងទៀត (Session revoked)",
      messageEn: "Session has been revoked. Please sign in again.",
    });
  }

  // 3. High-performance cache lookup (Redis / In-Memory fallback)
  const cachedUser = await CacheService.getJson<AuthenticatedUser>(`auth_session:${tokenKey}`);
  if (cachedUser) {
    req.user = cachedUser;
    return next();
  }

  // 4. Cryptographic JWT verification via Supabase Auth
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        error: "Unauthorized",
        messageKm: "Token ផុតកំណត់ ឬមិនត្រឹមត្រូវ (Invalid or expired token)",
        messageEn: "Session has expired or token is invalid. Please sign in again.",
      });
    }

    const sbUser = data.user;
    const metadata = sbUser.user_metadata || {};

    // Determine user role (defaults to student)
    let role: UserRole = "student";
    if (metadata.role === "admin" || metadata.role === "editor") {
      role = metadata.role;
    }

    const authenticatedUser: AuthenticatedUser = {
      id: sbUser.id,
      email: sbUser.email,
      fullName: metadata.full_name || metadata.display_name || (sbUser.email ? sbUser.email.split("@")[0] : "Student"),
      gradeLevel: Number(metadata.grade) || 12,
      role,
    };

    // Cache valid session in Redis/Memory for 60 seconds
    await CacheService.setJson(`auth_session:${tokenKey}`, authenticatedUser, 60);

    req.user = authenticatedUser;
    next();
  } catch (err: unknown) {
    return res.status(401).json({
      error: "Unauthorized",
      messageKm: "ការផ្ទៀងផ្ទាត់បរាជ័យ",
      messageEn: "Authentication token validation failed.",
    });
  }
}

/**
 * Role-Based Access Control (RBAC) Guard Middleware
 * Ensures users only access routes matching their permitted roles.
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        messageKm: "សូមចូលប្រើប្រាស់ដើម្បីបន្ត",
        messageEn: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
        messageKm: "អ្នកមិនមានសិទ្ធិចូលប្រើប្រាស់ផ្នែកនេះទេ (Insufficient permissions)",
        messageEn: `Access denied. Requires one of [${allowedRoles.join(", ")}] roles.`,
      });
    }

    next();
  };
}

/**
 * Optional Auth Middleware
 * Populates req.user if a valid token is provided, but allows unauthenticated requests to pass through.
 */
export async function optionalAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1]?.trim();
  if (!token) return next();

  if (config.nodeEnv !== "production" && (token === "00000000-0000-0000-0000-000000000001" || token === "demo-token")) {
    req.user = {
      id: "00000000-0000-0000-0000-000000000001",
      email: "demo.student@sciencekh.edu",
      fullName: "សិស្សគំរូ ScienceKH (Demo Student)",
      gradeLevel: 12,
      role: "student",
      isDemo: true,
    };
    return next();
  }

  const tokenKey = token.slice(-32);

  // Check blacklist
  const isBlacklisted = await CacheService.get(`blacklist:token:${tokenKey}`);
  if (isBlacklisted) return next();

  const cached = await CacheService.getJson<AuthenticatedUser>(`auth_session:${tokenKey}`);
  if (cached) {
    req.user = cached;
    return next();
  }

  try {
    const { data } = await supabase.auth.getUser(token);
    if (data?.user) {
      const sbUser = data.user;
      const metadata = sbUser.user_metadata || {};
      const authenticatedUser: AuthenticatedUser = {
        id: sbUser.id,
        email: sbUser.email,
        fullName: metadata.full_name || metadata.display_name || (sbUser.email ? sbUser.email.split("@")[0] : "Student"),
        gradeLevel: Number(metadata.grade) || 12,
        role: metadata.role === "admin" || metadata.role === "editor" ? metadata.role : "student",
      };
      await CacheService.setJson(`auth_session:${tokenKey}`, authenticatedUser, 60);
      req.user = authenticatedUser;
    }
  } catch {}

  next();
}
