// mobile/src/features/brotherhood/hooks/useSendMessage.ts

import { useCallback, useState } from "react";
import { Alert } from "react-native";

import { postGroupMessage } from "../api/brotherhoodApi";
import type { GroupMessage } from "../types";

export function useSendMessage(
  groupId: string | undefined,
  onMessageCreated?: (message: GroupMessage) => void
) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (body: string): Promise<GroupMessage | null> => {
      if (!groupId) {
        Alert.alert("No group selected", "Unable to send message right now.");
        return null;
      }
      const trimmed = body.trim();
      if (!trimmed) return null;

      setIsSending(true);
      setError(null);

      try {
        const message = await postGroupMessage(groupId, trimmed);
        onMessageCreated?.(message);
        return message;
      } catch (err) {
        const messageText =
          err instanceof Error
            ? err.message
            : "Failed to send message. Please try again.";
        setError(messageText);
        Alert.alert("Send failed", messageText);
        return null;
      } finally {
        setIsSending(false);
      }
    },
    [groupId, onMessageCreated]
  );

  return {
    sendMessage,
    isSending,
    error
  };
}

export default useSendMessage;
