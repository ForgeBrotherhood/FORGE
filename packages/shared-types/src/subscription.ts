// packages/shared-types/src/subscription.ts

export type SubscriptionStatus =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete";

export type BillingInterval = "month" | "year";

export interface SubscriptionPlan {
  id: string;
  stripePriceId?: string;
  name: string;
  description?: string;
  amountCents: number;
  currency: "usd";
  interval: BillingInterval;
  features: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: string; // ISO
  cancelAtPeriodEnd: boolean;
}
