import { Response } from "express";

/**
 * Standard API Response Envelope for ScienceKH
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Send standard successful JSON response
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
): Response {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send standard error JSON response
 */
export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  details?: unknown
): Response {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(details ? { details } : {}),
    timestamp: new Date().toISOString(),
  });
}

