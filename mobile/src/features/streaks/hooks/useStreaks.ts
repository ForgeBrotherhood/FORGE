// mobile/src/features/streaks/hooks/useStreaks.ts

import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export interface StreakStats {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function fetchStreakStats(): Promise<StreakStats> {
  const url = `${API_BASE_URL}/streaks/me`;

  const response = await fetch(url);
  const text = await response.text();

  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return {
    currentStreak: data.currentStreak ?? 0,
    bestStreak: data.bestStreak ?? 0,
    lastActiveDate: data.lastActiveDate ?? null
  };
}

export function useStreaks() {
  const [stats, setStats] = useState<StreakStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchStreakStats();
      setStats(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load your streaks. Please try again.";
      setError(message);
      Alert.alert("Streaks", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    stats,
    isLoading,
    error,
    refresh
  };
}
