// ==============================================================================
// ScienceKH — Enterprise Backend Security Hardening Middleware
// Defense-in-depth against:
//   1. HTTP Parameter Pollution (HPP)
//   2. Null Byte & Control Character Injections
//   3. Object Prototype & Operator Injections (MongoDB/JSON Injection)
//   4. Cross-Origin Leakage
// ==============================================================================

import type { Request, Response, NextFunction } from "express";

/**
 * HTTP Parameter Pollution (HPP) Defense:
 * If an attacker supplies duplicate query parameters (?id=1&id=2),
 * keeps only the last scalar value to prevent unexpected array coercion.
 */
export function hppSanitizer(req: Request, _res: Response, next: NextFunction): void {
  if (req.query && typeof req.query === "object") {
    for (const key of Object.keys(req.query)) {
      const val = req.query[key];
      if (Array.isArray(val)) {
        req.query[key] = val[val.length - 1];
      }
    }
  }
  next();
}

/**
 * Recursively sanitizes data values:
 * - Strips dangerous null bytes (\0)
 * - Disallows object keys starting with '$' or containing '.' (NoSQL injection prevention)
 * - Replaces non-printable control characters (except standard whitespace \n, \r, \t)
 */
function sanitizeValue(value: unknown, depth = 0): unknown {
  if (depth > 10) return undefined; // Prevent infinite circular recursion

  if (typeof value === "string") {
    // Strip null bytes and non-printable control characters
    return value.replace(/\0/g, "").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1));
  }

  if (value && typeof value === "object") {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      // Disallow dangerous prototype pollution and operator keys
      if (key.startsWith("$") || key.includes(".") || key === "__proto__" || key === "constructor") {
        continue;
      }
      cleanObj[key] = sanitizeValue(val, depth + 1);
    }
    return cleanObj;
  }

  return value;
}

/**
 * Deep Request Body & Query Sanitizer Middleware
 */
export function inputSanitizer(req: Request, _res: Response, next: NextFunction): void {
  try {
    if (req.body && typeof req.body === "object") {
      req.body = sanitizeValue(req.body);
    }
    if (req.query && typeof req.query === "object") {
      req.query = sanitizeValue(req.query) as any;
    }
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Defense-in-depth security response headers
 */
export function extraSecurityHeaders(_req: Request, res: Response, next: NextFunction): void {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Download-Options", "noopen");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
}
