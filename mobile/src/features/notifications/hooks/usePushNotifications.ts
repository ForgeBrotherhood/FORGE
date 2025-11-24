// mobile/src/features/notifications/hooks/usePushNotifications.ts

import { useCallback, useState } from "react";
import { Platform } from "react-native";
import { registerPushToken } from "../api/notificationsApi";

export type PushPermissionStatus = "unknown" | "granted" | "denied";

export interface PushNotificationsState {
  status: PushPermissionStatus;
  isRequesting: boolean;
  pushToken: string | null;
  error: string | null;
}

/**
 * Minimal push notifications hook for the mobile app skeleton.
 *
 * - No real OS permission or Expo Notifications yet.
 * - Simulates success and calls registerPushToken() so you can later
 *   plug in the real flow without changing your screen code.
 */
export function usePushNotifications() {
  const [state, setState] = useState<PushNotificationsState>({
    status: "unknown",
    isRequesting: false,
    pushToken: null,
    error: null
  });

  const requestPermissionAndRegister = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isRequesting: true,
      error: null
    }));

    try {
      // In production, you’ll ask for OS permission and get a real token
      // (e.g., via expo-notifications). For now, we fake it.
      const fakeToken = `debug-${Platform.OS}-token-${Date.now().toString()}`;

      await registerPushToken({
        token: fakeToken,
        platform:
          Platform.OS === "ios"
            ? "ios"
            : Platform.OS === "android"
            ? "android"
            : "web"
      });

      setState({
        status: "granted",
        isRequesting: false,
        pushToken: fakeToken,
        error: null
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to enable notifications.";

      setState({
        status: "denied",
        isRequesting: false,
        pushToken: null,
        error: message
      });
    }
  }, []);

  return {
    status: state.status,
    isRequesting: state.isRequesting,
    pushToken: state.pushToken,
    error: state.error,
    requestPermissionAndRegister
  };
}
