// mobile/src/features/subscriptions/hooks/useSubscriptionStatus.ts

import { useCallback, useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

import {
  createBillingPortalSession,
  createCheckoutSession,
  fetchSubscriptionStatus,
  type SubscriptionStatus
} from "../api/subscriptionsApi";

export function useSubscriptionStatus() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSubscriptionStatus();
      setStatus(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load your subscription. Please try again.";
      setError(message);
      Alert.alert("Subscription", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const startUpgrade = useCallback(async () => {
    setIsUpdating(true);
    setError(null);
    try {
      const { url } = await createCheckoutSession();
      if (!url) {
        throw new Error("No checkout URL returned.");
      }
      await Linking.openURL(url);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not start checkout. Please try again.";
      setError(message);
      Alert.alert("Upgrade", message);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const openBillingPortal = useCallback(async () => {
    setIsUpdating(true);
    setError(null);
    try {
      const { url } = await createBillingPortalSession();
      if (!url) {
        throw new Error("No billing URL returned.");
      }
      await Linking.openURL(url);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not open billing portal. Please try again.";
      setError(message);
      Alert.alert("Billing", message);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const isActive = !!status?.isActive;

  return {
    status,
    isActive,
    isLoading,
    isUpdating,
    error,
    refresh,
    startUpgrade,
    openBillingPortal
  };
}
