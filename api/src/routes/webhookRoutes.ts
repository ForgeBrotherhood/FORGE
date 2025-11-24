// api/src/routes/webhookRoutes.ts
//
// Webhooks – primarily Stripe events (subscription lifecycle).
//
// NOTE: For a production Stripe webhook, you'll typically need raw body parsing
// (express.raw) configured in app.ts *before* express.json(). For now this is a
// simple JSON-based stub; we’ll tighten it when wiring Stripe fully.

import { Router } from "express";
import { handleStripeWebhook } from "../controllers/webhookController";

const router = Router();

// POST /api/webhooks/stripe
router.post("/stripe", handleStripeWebhook);

export default router;
