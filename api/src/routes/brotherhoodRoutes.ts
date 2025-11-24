// api/src/routes/brotherhoodRoutes.ts
//
// Brotherhood free rooms: groups, membership, and group messages.

import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  listGroups,
  getGroupById,
  joinGroup,
  listGroupMessages,
  sendGroupMessage
} from "../controllers/brotherhoodController";

const router = Router();

// GET /api/brotherhood/groups
// List available groups (rooms) with optional filters (default rooms, etc.)
router.get("/groups", requireAuth, listGroups);

// GET /api/brotherhood/groups/:groupId
// Get one group’s details (name, description, etc.)
router.get("/groups/:groupId", requireAuth, getGroupById);

// POST /api/brotherhood/groups/:groupId/join
// Join a group (creates GroupMember if not exists).
router.post("/groups/:groupId/join", requireAuth, joinGroup);

// GET /api/brotherhood/groups/:groupId/messages
// List messages in a group (supports pagination via query params later).
router.get("/groups/:groupId/messages", requireAuth, listGroupMessages);

// POST /api/brotherhood/groups/:groupId/messages
// Send a new message into the group as the logged-in user.
router.post("/groups/:groupId/messages", requireAuth, sendGroupMessage);

export default router;
