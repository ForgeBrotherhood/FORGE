// api/src/controllers/journalController.ts
//
// Journal CRUD for the user's private entries.

import { Request, Response, NextFunction } from "express";
import * as journalService from "../services/journalService";

type AuthRequest = Request & {
  user?: {
    id: string;
  };
};

export async function listJournalEntries(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const entries = await journalService.listEntries(req.user.id);
    return res.json(entries);
  } catch (err) {
    next(err);
  }
}

export async function getJournalEntry(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { entryId } = req.params;
    const entry = await journalService.getEntryById(req.user.id, entryId);
    return res.json(entry);
  } catch (err) {
    next(err);
  }
}

export async function createJournalEntry(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content, mood } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "content is required" });
    }

    const entry = await journalService.createEntry(req.user.id, {
      title,
      content,
      mood
    });

    return res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function updateJournalEntry(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { entryId } = req.params;
    const { title, content, mood } = req.body;

    const entry = await journalService.updateEntry(req.user.id, entryId, {
      title,
      content,
      mood
    });

    return res.json(entry);
  } catch (err) {
    next(err);
  }
}

export async function deleteJournalEntry(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { entryId } = req.params;
    await journalService.deleteEntry(req.user.id, entryId);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Aliases to match route names used earlier
export {
  listJournalEntries as listEntries,
  getJournalEntry as getEntryById,
  createJournalEntry as createEntry,
  updateJournalEntry as updateEntry,
  deleteJournalEntry as deleteEntry
};
