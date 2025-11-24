// mobile/src/features/smith/hooks/useSmithChat.ts

import { useCallback, useState } from "react";
import { sendSmithMessage } from "../api/smithApi";
import type { SmithMessage, SmithMode, SmithRole } from "../types";

function createLocalMessage(role: SmithRole, content: string): SmithMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: new Date().toISOString()
  };
}

/**
 * Local chat state for The Smith.
 * Handles user messages, calling the API, and appending Smith replies.
 */
export function useSmithChat(mode: SmithMode = "default") {
  const [messages, setMessages] = useState<SmithMessage[]>(() => [
    createLocalMessage(
      "smith",
      "I am The Smith. Speak plainly. What are you working through right now?"
    )
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMessage = createLocalMessage("user", trimmed);
      setMessages((prev) => [...prev, userMessage]);
      setIsSending(true);
      setError(null);

      try {
        const { reply } = await sendSmithMessage(trimmed, mode);
        const smithMessage = createLocalMessage("smith", reply || "…");
        setMessages((prev) => [...prev, smithMessage]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "The Smith is silent. Try again in a moment.";
        setError(message);
      } finally {
        setIsSending(false);
      }
    },
    [mode]
  );

  const resetConversation = useCallback(() => {
    setMessages([
      createLocalMessage(
        "smith",
        "Let’s reset. Start from the beginning—what’s the real issue on your mind?"
      )
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isSending,
    error,
    sendMessage,
    resetConversation
  };
}
