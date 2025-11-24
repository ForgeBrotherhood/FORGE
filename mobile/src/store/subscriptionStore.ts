// mobile/src/store/subscriptionStore.ts

import { useEffect, useState } from "react";

export type SubscriptionTier = "free" | "smith_premium";

export interface SubscriptionState {
  tier: SubscriptionTier;
  isActive: boolean;
  currentPeriodEnd: string | null; // ISO string
  loading: boolean;
  error: string | null;
}

type SubscriptionListener = (state: SubscriptionState) => void;

const initialState: SubscriptionState = {
  tier: "free",
  isActive: false,
  currentPeriodEnd: null,
  loading: false,
  error: null
};

let subscriptionState: SubscriptionState = initialState;
const listeners = new Set<SubscriptionListener>();

function setSubscriptionState(
  updater:
    | Partial<SubscriptionState>
    | ((prev: SubscriptionState) => SubscriptionState)
) {
  subscriptionState =
    typeof updater === "function"
      ? (updater as (prev: SubscriptionState) => SubscriptionState)(
          subscriptionState
        )
      : { ...subscriptionState, ...updater };

  listeners.forEach((listener) => listener(subscriptionState));
}

export function getSubscriptionState(): SubscriptionState {
  return subscriptionState;
}

export function subscribeToSubscription(listener: SubscriptionListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSubscriptionStore(): SubscriptionState {
  const [state, setState] = useState<SubscriptionState>(subscriptionState);

  useEffect(() => {
    const listener: SubscriptionListener = (next) => setState(next);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return state;
}

// Actions

export function setSubscription(
  tier: SubscriptionTier,
  isActive: boolean,
  currentPeriodEnd?: string | null
) {
  setSubscriptionState({
    tier,
    isActive,
    currentPeriodEnd: currentPeriodEnd ?? null,
    error: null
  });
}

export function setSubscriptionLoading(loading: boolean) {
  setSubscriptionState({ loading });
}

export function setSubscriptionError(error: string | null) {
  setSubscriptionState({ error });
}

export function clearSubscription() {
  subscriptionState = initialState;
  listeners.forEach((listener) => listener(subscriptionState));
}
