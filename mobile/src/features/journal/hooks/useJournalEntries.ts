// mobile/src/features/journal/hooks/useJournalEntries.ts

import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  fetchJournalEntries,
  createJournalEntry,
  type JournalEntry,
  type JournalMood
} from "../api/journalApi";

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchJournalEntries();
      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEntries(sorted);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load your journal. Please try again.";
      setError(message);
      Alert.alert("Journal", message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addEntry = useCallback(
    async (body: string, mood?: JournalMood) => {
      const trimmed = body.trim();
      if (!trimmed) return null;

      setIsSaving(true);
      setError(null);

      try {
        const created = await createJournalEntry({ body: trimmed, mood });
        setEntries((prev) => [created, ...prev]);
        return created;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Could not save entry. Please try again.";
        setError(message);
        Alert.alert("Journal", message);
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  return {
    entries,
    isLoading,
    isSaving,
    error,
    refresh,
    addEntry
  };
}
