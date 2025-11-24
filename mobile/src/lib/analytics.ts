// mobile/src/lib/analytics.ts

import { ENV } from "./env";
import { logDebug } from "./logger";

type AnalyticsPayload = Record<string, unknown>;

let currentUserId: string | null = null;

export function identifyUser(userId: string | null) {
  currentUserId = userId;
  logDebug("Analytics", "identifyUser", { userId });
  // Later: wire to Mixpanel / GA as per plan. 
}

export function trackEvent(
  name: string,
  payload: AnalyticsPayload = {}
) {
  logDebug("Analytics", "trackEvent", {
    name,
    userId: currentUserId,
    env: ENV.APP_ENV,
    ...payload
  });
  // Later: send to analytics SDK.
}

export function trackScreenView(
  name: string,
  payload: AnalyticsPayload = {}
) {
  trackEvent(`screen_view:${name}`, payload);
}

export function resetAnalytics() {
  currentUserId = null;
}
