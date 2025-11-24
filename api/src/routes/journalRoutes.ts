// api/src/routes/journalRoutes.ts
//
// Journal entries: CRUD for the user’s private Forge journal.

import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  listJournalEntries,
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from "../controllers/journalController";

const router = Router();

// GET /api/journal
// List current user's entries (optionally with date filters & pagination later).
router.get("/", requireAuth, listJournalEntries);

// GET /api/journal/:entryId
router.get("/:entryId", requireAuth, getJournalEntry);

// POST /api/journal
router.post("/", requireAuth, createJournalEntry);

// PATCH /api/journal/:entryId
router.patch("/:entryId", requireAuth, updateJournalEntry);

// DELETE /api/journal/:entryId
router.delete("/:entryId", requireAuth, deleteJournalEntry);

export default router;
