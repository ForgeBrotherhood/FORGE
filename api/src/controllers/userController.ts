// api/src/controllers/userController.ts
//
// Current user profile + basic profile lookup.

import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

type AuthRequest = Request & {
  user?: {
    id: string;
    email?: string;
    isPremium?: boolean;
  };
};

export async function getCurrentUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userService.getUserById(req.user.id);
    return res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateCurrentUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, avatarUrl, bio } = req.body;

    const updated = await userService.updateUser(req.user.id, {
      name,
      avatarUrl,
      bio
    });

    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);
    return res.json(user);
  } catch (err) {
    next(err);
  }
}
