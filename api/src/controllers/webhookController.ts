// api/src/controllers/webhookController.ts
//
// Webhook handler – currently focused on Stripe subscription events.

import { Request, Response, NextFunction } from "express";
import * as subscriptionService from "../services/subscriptionService";

export async function handleStripeWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // NOTE: For production Stripe webhooks you usually need the raw body
    // to verify signatures. This skeleton assumes JSON body parsing.
    const eventPayload = req.body;
    await subscriptionService.handleStripeWebhook(eventPayload);

    // Stripe expects a 2xx status to consider the webhook delivered.
    return res.json({ received: true });
  } catch (err) {
    next(err);
  }
}
