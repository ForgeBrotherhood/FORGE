// api/src/routes/authRoutes.ts
//
// Authentication: register, login, logout, refresh, current user.

import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser
} from "../controllers/authController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/logout
router.post("/logout", requireAuth, logoutUser);

// POST /api/auth/refresh
router.post("/refresh", refreshToken);

// GET /api/auth/me
router.get("/me", requireAuth, getCurrentUser);

export default router;
