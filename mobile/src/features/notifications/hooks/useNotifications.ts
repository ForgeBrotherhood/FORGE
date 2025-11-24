// mobile/src/features/notifications/hooks/useNotifications.ts

import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export type NotificationCategory =
  | "brotherhood"
  | "smith"
  | "journal"
  | "system";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO timestamp
  read: boolean;
  category: NotificationCategory;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function fetchNotifications(): Promise<AppNotification[]> {
  const url = `${API_BASE_URL}/notifications`;
  const response = await fetch(url);
  const text = await response.text();

  let data: any = [];
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = [];
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as AppNotification[];
}

async function markNotificationRead(id: string): Promise<void> {
  const url = `${API_BASE_URL}/notifications/${id}/read`;
  const response = await fetch(url, {
    method: "POST"
  });

  if (!response.ok) {
    const text = await response.text();
    let data: any = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }
    }
    const message =
      (data && (data.message || data.error)) ||
      `Failed to mark notification as read (status ${response.status})`;
    throw new Error(message);
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications();
      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sorted);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load notifications. Please try again.";
      setError(message);
      Alert.alert("Notifications", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                read: true
              }
            : n
        )
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not update notification. Please try again.";
      Alert.alert("Notifications", message);
    }
  }, []);

  return {
    notifications,
    isLoading,
    error,
    refresh,
    markAsRead
  };
}
