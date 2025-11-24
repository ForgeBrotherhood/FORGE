// api/src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export interface HttpError extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Central Express error handler.
 * Attach this AFTER all routes in app.ts:
 *   app.use(errorHandler);
 */
export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const status =
    typeof err.statusCode === "number" &&
    err.statusCode >= 400 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  const isProd = process.env.NODE_ENV === "production";

  logger.error("Unhandled error", {
    statusCode: status,
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack
  });

  const payload: Record<string, unknown> = {
    message: err.message || "Internal server error"
  };

  if (!isProd) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
