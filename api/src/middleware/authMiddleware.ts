// api/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { verifyAccessToken } from "../lib/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

function getTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");

  if (!scheme || !token || scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}

/**
 * Strict auth middleware:
 * - Requires a valid Bearer access token
 * - Attaches `req.user = { id }`
 * - Returns 401 if missing/invalid
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = await verifyAccessToken(token);

    if (!payload || !payload.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    (req as AuthenticatedRequest).user = { id: payload.userId };

    return next();
  } catch (err) {
    logger.warn("Auth failed", {
      error: (err as Error).message,
      path: req.originalUrl
    });

    return res.status(401).json({ message: "Unauthorized" });
  }
}

/**
 * Optional auth:
 * - If a valid token is present, attaches `req.user`
 * - If missing/invalid, continues as anonymous (no 401)
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return next();
    }

    const payload = await verifyAccessToken(token);

    if (payload && payload.userId) {
      (req as AuthenticatedRequest).user = { id: payload.userId };
    }

    return next();
  } catch (err) {
    // Token invalid — behave as anonymous, just log.
    logger.debug("Optional auth token invalid", {
      error: (err as Error).message,
      path: req.originalUrl
    });

    return next();
  }
}
