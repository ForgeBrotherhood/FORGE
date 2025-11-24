// mobile/src/features/smith/screens/SmithChatScreen.tsx

import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useSmithChat } from "../hooks/useSmithChat";
import SmithMessageBubble from "../components/SmithMessageBubble";
import PromptSuggestionChips from "../components/PromptSuggestionChips";
import MessageComposer from "../../brotherhood/components/MessageComposer";
import type { SmithMessage } from "../types";

const SmithChatScreen: React.FC = () => {
  const [draft, setDraft] = useState("");
  const { messages, isSending, error, sendMessage } = useSmithChat("default");

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    await sendMessage(trimmed);
    setDraft("");
  };

  const renderItem = ({ item }: { item: SmithMessage }) => (
    <SmithMessageBubble role={item.role} content={item.content} />
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>The Smith</Text>
          <Text style={styles.subtitle}>
            Your stoic, no-nonsense mentor. Speak honestly. Expect direct clarity,
            not comfort.
          </Text>
        </View>

        <PromptSuggestionChips onSelect={setDraft} />

        <View style={styles.chatArea}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesContent}
          />
        </View>

        <MessageComposer
          value={draft}
          onChangeText={setDraft}
          onSend={handleSend}
          isSending={isSending}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050608"
  },
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    backgroundColor: "#020617"
  },
  title: {
    color: "#f9fafb",
    fontSize: 20,
    fontWeight: "700"
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4
  },
  messagesContent: {
    paddingBottom: 12
  },
  errorText: {
    color: "#f97373",
    fontSize: 12,
    marginBottom: 4,
    textAlign: "center"
  }
});

export default SmithChatScreen;
