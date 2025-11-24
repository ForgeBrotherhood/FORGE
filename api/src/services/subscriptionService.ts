// api/src/services/subscriptionService.ts
//
// Stripe subscription logic for The Smith premium.

import { SubscriptionStatus } from "@prisma/client";
import prisma from "../db/client";
import logger from "../config/logger";
import stripe from "../lib/stripeClient";
import { notifySubscriptionStatusChanged } from "./notificationService";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export interface SubscriptionStatusResponse {
  status: string; // "none" or Stripe-like status
  isActive: boolean;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

export async function getSubscriptionStatus(
  userId: string
): Promise<SubscriptionStatusResponse> {
  const sub = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  if (!sub) {
    return {
      status: "none",
      isActive: false,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false
    };
  }

  const isActive =
    sub.status === "ACTIVE" || sub.status === "TRIALING";

  return {
    status: sub.status,
    isActive,
    currentPeriodEnd: sub.currentPeriodEnd,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd
  };
}

export interface CheckoutSessionOptions {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(
  userId: string,
  options: CheckoutSessionOptions
): Promise<{ url: string | null }> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw createError(404, "User not found");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price: options.priceId,
        quantity: 1
      }
    ],
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    subscription_data: {
      metadata: {
        userId
      }
    },
    metadata: {
      userId
    }
  });

  logger.info("Created Stripe checkout session", {
    userId,
    sessionId: session.id
  });

  return { url: session.url };
}

export async function createCustomerPortalSession(
  userId: string,
  returnUrl: string
): Promise<{ url: string | null }> {
  const sub = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  if (!sub || !sub.stripeCustomerId) {
    throw createError(
      400,
      "No Stripe customer found for this user. They may not have an active subscription."
    );
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: returnUrl
  });

  logger.info("Created Stripe billing portal session", {
    userId,
    customerId: sub.stripeCustomerId
  });

  return { url: portalSession.url };
}

// --- Webhook handling ---

function mapStripeStatus(
  stripeStatus: string
): SubscriptionStatus {
  switch (stripeStatus) {
    case "incomplete":
      return "INCOMPLETE";
    case "incomplete_expired":
      return "INCOMPLETE_EXPIRED";
    case "trialing":
      return "TRIALING";
    case "active":
      return "ACTIVE";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
      return "CANCELED";
    case "unpaid":
      return "UNPAID";
    default:
      return "ACTIVE";
  }
}

async function syncSubscriptionFromStripe(stripeSub: any) {
  const userId = stripeSub.metadata?.userId as string | undefined;

  if (!userId) {
    logger.warn("Stripe subscription missing userId metadata", {
      subscriptionId: stripeSub.id
    });
    return;
  }

  const status = mapStripeStatus(stripeSub.status as string);

  const data = {
    userId,
    stripeCustomerId: String(stripeSub.customer),
    stripeSubscriptionId: stripeSub.id,
    status,
    currentPeriodEnd: new Date(
      (stripeSub.current_period_end as number) * 1000
    ),
    cancelAtPeriodEnd: Boolean(stripeSub.cancel_at_period_end)
  };

  const existing = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: data.stripeSubscriptionId }
  });

  let record;
  if (existing) {
    record = await prisma.subscription.update({
      where: { id: existing.id },
      data
    });
  } else {
    record = await prisma.subscription.create({ data });
  }

  const isActive =
    record.status === "ACTIVE" || record.status === "TRIALING";

  await notifySubscriptionStatusChanged(userId, record.status, isActive);

  logger.info("Subscription synced from Stripe", {
    userId,
    stripeSubscriptionId: record.stripeSubscriptionId,
    status: record.status
  });
}

export async function handleStripeWebhook(payload: any): Promise<void> {
  const eventType = payload?.type;

  if (!eventType) {
    throw createError(400, "Invalid Stripe webhook payload");
  }

  logger.info("Received Stripe webhook", { type: eventType });

  switch (eventType) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const stripeSub = payload.data?.object;
      if (!stripeSub) {
        logger.warn("Stripe subscription event missing data.object");
        return;
      }

      await syncSubscriptionFromStripe(stripeSub);
      break;
    }
    default: {
      logger.info("Unhandled Stripe webhook type", { type: eventType });
    }
  }
}
