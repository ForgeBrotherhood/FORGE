// api/src/routes/smithRoutes.ts
//
// The Smith – AI mentor endpoints.
// These are thin wrappers; most logic will live in smithService / smithController.

import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  chatWithSmith,
  runWeeklyReview
} from "../controllers/smithController";

const router = Router();

// POST /api/smith/chat
// Single-turn or conversational chat with The Smith.
// Request body will include the user's message (and optionally prior context).
router.post("/chat", requireAuth, chatWithSmith);

// POST /api/smith/weekly-review
// Kick off or complete a structured weekly reflection flow.
router.post("/weekly-review", requireAuth, runWeeklyReview);

export default router;
