// api/src/middleware/requestLogger.ts

import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

/**
 * Lightweight request logger using our internal logger.
 * Attach near the top of app.ts:
 *   app.use(requestLogger);
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;

    // Skip super-noisy health checks if you want:
    if (req.path === "/health") {
      return;
    }

    logger.info("HTTP request", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs
    });
  });

  next();
}
