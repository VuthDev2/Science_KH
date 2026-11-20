import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { config } from "../config/env.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorId = crypto.randomUUID().slice(0, 8);
  console.error(`[ScienceKH Backend Error #${errorId}]:`, err);

  const statusCode = (err as any).statusCode || 500;
  const isProd = config.nodeEnv === "production";

  // Prevent leaking internal database paths, stack traces, or schema errors to clients
  const sanitizedMessage =
    statusCode >= 500 && isProd
      ? "An internal server error occurred. Please try again later."
      : err.message || "Internal server error";

  res.status(statusCode).json({
    error: statusCode >= 500 ? "InternalServerError" : "BadRequest",
    message: sanitizedMessage,
    errorId,
    timestamp: new Date().toISOString(),
  });
}

