// api/src/routes/userRoutes.ts
//
// User profile + basic account management.
// Auth tokens are handled in authRoutes; this is for profile data.

import { Router } from "express";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile
} from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// GET /api/users/me
router.get("/me", requireAuth, getCurrentUserProfile);

// PATCH /api/users/me
router.patch("/me", requireAuth, updateCurrentUserProfile);

export default router;
