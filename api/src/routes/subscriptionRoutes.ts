// api/src/routes/subscriptionRoutes.ts
//
// Subscriptions for The Smith (premium):
// - Check current status
// - Create Stripe checkout session
// - Create Stripe billing portal session

import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import {
  getSubscriptionStatus,
  createCheckoutSession,
  createBillingPortalSession
} from "../controllers/subscriptionController";

const router = Router();

// GET /api/subscriptions/me
// Returns subscription status (ACTIVE, INACTIVE, etc.) for logged-in user.
router.get("/me", requireAuth, getSubscriptionStatus);

// POST /api/subscriptions/checkout-session
// Creates a Stripe Checkout Session and returns a URL for the client to open.
router.post("/checkout-session", requireAuth, createCheckoutSession);

// POST /api/subscriptions/billing-portal
// Creates a Stripe Billing Portal session so users can manage/cancel their plan.
router.post("/billing-portal", requireAuth, createBillingPortalSession);

export default router;
