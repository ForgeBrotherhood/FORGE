// api/src/controllers/brotherhoodController.ts
//
// Brotherhood free rooms: groups, memberships, and group chat messages.

import { Request, Response, NextFunction } from "express";
import * as brotherhoodService from "../services/brotherhoodService";

type AuthRequest = Request & {
  user?: {
    id: string;
  };
};

export async function listGroups(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const onlyDefault =
      req.query.default === "true" || req.query.default === "1";

    const groups = await brotherhoodService.listGroups(onlyDefault);
    return res.json(groups);
  } catch (err) {
    next(err);
  }
}

export async function getGroupById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { groupId } = req.params;
    const group = await brotherhoodService.getGroupById(groupId);
    return res.json(group);
  } catch (err) {
    next(err);
  }
}

export async function joinGroup(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { groupId } = req.params;
    const membership = await brotherhoodService.joinGroup(
      req.user.id,
      groupId
    );

    return res.json(membership);
  } catch (err) {
    next(err);
  }
}

export async function leaveGroup(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { groupId } = req.params;
    await brotherhoodService.leaveGroup(req.user.id, groupId);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getGroupMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { groupId } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : 50;

    const messages = await brotherhoodService.getGroupMessages(groupId, limit);
    return res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function sendMessageToGroup(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { groupId } = req.params;
    const { body } = req.body;

    if (!body || typeof body !== "string") {
      return res.status(400).json({ error: "Message body is required" });
    }

    const message = await brotherhoodService.sendMessageToGroup(
      req.user.id,
      groupId,
      body
    );

    return res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}
