// api/src/controllers/subscriptionController.ts
//
// Subscription endpoints for The Smith premium (Stripe-powered).

import { Request, Response, NextFunction } from "express";
import * as subscriptionService from "../services/subscriptionService";

type AuthRequest = Request & {
  user?: {
    id: string;
    email?: string;
  };
};

export async function getStatus(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const status = await subscriptionService.getSubscriptionStatus(req.user.id);
    return res.json(status);
  } catch (err) {
    next(err);
  }
}

export async function createCheckoutSession(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId || !successUrl || !cancelUrl) {
      return res.status(400).json({
        error: "priceId, successUrl, and cancelUrl are required"
      });
    }

    const { url } = await subscriptionService.createCheckoutSession(
      req.user.id,
      {
        priceId,
        successUrl,
        cancelUrl
      }
    );

    return res.json({ url });
  } catch (err) {
    next(err);
  }
}

export async function createCustomerPortalSession(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { returnUrl } = req.body;

    if (!returnUrl) {
      return res.status(400).json({ error: "returnUrl is required" });
    }

    const { url } = await subscriptionService.createCustomerPortalSession(
      req.user.id,
      returnUrl
    );

    return res.json({ url });
  } catch (err) {
    next(err);
  }
}
