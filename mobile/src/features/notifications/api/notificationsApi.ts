// mobile/src/features/notifications/api/notificationsApi.ts

/**
 * Skeleton API client for notifications.
 *
 * Right now this just logs to the console so you can safely run the app
 * without a backend. Once your Node/Express API is ready, you can plug
 * the real HTTP calls in here. :contentReference[oaicite:2]{index=2}
 */

export type PushPlatform = "ios" | "android" | "web";

export interface RegisterPushTokenPayload {
  token: string;
  platform: PushPlatform;
}

export async function registerPushToken(
  payload: RegisterPushTokenPayload
): Promise<void> {
  try {
    console.log("[FORGE] registerPushToken (placeholder)", payload);

    // Later, when the backend is running, you might do:
    //
    // const API_BASE_URL =
    //   process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
    //
    // await fetch(`${API_BASE_URL}/notifications/register-device`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // });

  } catch (err) {
    console.log("[FORGE] registerPushToken failed", err);
    throw err;
  }
}
