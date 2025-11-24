// api/src/controllers/smithController.ts
//
// The Smith – AI mentor endpoints (premium).

import { Request, Response, NextFunction } from "express";
import * as smithService from "../services/smithService";

type AuthRequest = Request & {
  user?: {
    id: string;
    isPremium?: boolean;
  };
};

export async function handleChatMessage(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const result = await smithService.chatWithSmith(req.user.id, message);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function generateWeeklyReview(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = req.body ?? {};
    const result = await smithService.runWeeklyReview(req.user.id, payload);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getInsights(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await smithService.getInsights(req.user.id);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}
