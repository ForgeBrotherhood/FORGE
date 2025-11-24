// mobile/src/features/brotherhood/hooks/useGroupMessages.ts

import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { fetchGroupMessages } from "../api/brotherhoodApi";
import type { GroupMessage } from "../types";

export function useGroupMessages(groupId: string | undefined) {
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!groupId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchGroupMessages(groupId);
      setMessages(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load messages. Please try again.";
      setError(message);
      Alert.alert("Could not load chat", message);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const appendMessage = useCallback((message: GroupMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    refresh,
    appendMessage
  };
}

export default useGroupMessages;
