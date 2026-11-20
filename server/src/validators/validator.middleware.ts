import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { sendError } from "../types/api.js";

/**
 * Reusable Express middleware for Zod schema validation
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(
          res,
          err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
          422,
          err.flatten()
        );
      }
      return sendError(res, "Validation failed", 400);
    }
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(
          res,
          err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
          422,
          err.flatten()
        );
      }
      return sendError(res, "Query validation failed", 400);
    }
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params) as any;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return sendError(
          res,
          err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
          422,
          err.flatten()
        );
      }
      return sendError(res, "Parameter validation failed", 400);
    }
  };
}

