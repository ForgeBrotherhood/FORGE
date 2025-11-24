// api/src/models/Subscription.ts

import {
  Subscription as PrismaSubscription,
  SubscriptionStatus as PrismaSubscriptionStatus
} from "@prisma/client";

/**
 * Stripe-backed subscription record for The Smith.
 */
export type Subscription = PrismaSubscription;

/**
 * Re-export the Prisma enum so other layers can
 * just import from "../models/Subscription".
 */
export const SubscriptionStatus = PrismaSubscriptionStatus;
export type SubscriptionStatus = PrismaSubscriptionStatus;
