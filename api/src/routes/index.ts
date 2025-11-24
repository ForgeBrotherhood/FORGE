// api/src/routes/index.ts
//
// Main API router – mounts all domain-specific routers under /api/*.

import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import brotherhoodRoutes from "./brotherhoodRoutes";
import smithRoutes from "./smithRoutes";
import journalRoutes from "./journalRoutes";
import subscriptionRoutes from "./subscriptionRoutes";
import webhookRoutes from "./webhookRoutes";

const router = Router();

// Simple root for /api
router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "forge-api",
    message: "Forge API root. See /api/* routes."
  });
});

// Auth (login, signup, tokens)
router.use("/auth", authRoutes);

// User profile & settings
router.use("/users", userRoutes);

// Brotherhood: groups, memberships, messages
router.use("/brotherhood", brotherhoodRoutes);

// The Smith (AI mentor) endpoints
router.use("/smith", smithRoutes);

// Journaling (entries, history)
router.use("/journal", journalRoutes);

// Subscriptions / Stripe checkout & portal
router.use("/subscriptions", subscriptionRoutes);

// Webhooks (Stripe, etc.)
router.use("/webhooks", webhookRoutes);

export default router;
