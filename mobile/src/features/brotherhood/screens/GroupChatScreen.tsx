// mobile/src/features/brotherhood/screens/GroupChatScreen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { BrotherhoodStackParamList } from "../../../navigation/types";
import useGroupMessages from "../hooks/useGroupMessages";
import useSendMessage from "../hooks/useSendMessage";
import type { GroupMessage } from "../types";
import MessageBubble from "../components/MessageBubble";
import MessageComposer from "../components/MessageComposer";
import TypingIndicator from "../components/TypingIndicator";

type Props = NativeStackScreenProps<
  BrotherhoodStackParamList,
  "GroupChat"
>;

const GroupChatScreen: React.FC<Props> = ({ route }) => {
  const { groupId } = route.params;
  const [draft, setDraft] = useState("");

  const {
    messages,
    isLoading,
    error,
    appendMessage
  } = useGroupMessages(groupId);
  const { sendMessage, isSending } = useSendMessage(groupId, appendMessage);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text) return;
    const created = await sendMessage(text);
    if (created) {
      setDraft("");
    }
  };

  const renderItem = ({ item }: { item: GroupMessage }) => {
    // TODO: replace with real auth user ID when auth store exists.
    const isOwn = false;
    return <MessageBubble message={item} isOwn={isOwn} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Brotherhood Room</Text>
            <Text style={styles.subtitle}>
              Share the real grind. Ask, answer, and sharpen each other.
            </Text>
          </View>

          <View style={styles.chatContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.messagesContent}
              ListEmptyComponent={
                isLoading ? (
                  <Text style={styles.emptyText}>Loading messages...</Text>
                ) : (
                  <Text style={styles.emptyText}>
                    No messages yet. Be the first to strike the anvil.
                  </Text>
                )
              }
            />

            <TypingIndicator visible={isSending} />
          </View>

          <MessageComposer
            value={draft}
            onChangeText={setDraft}
            onSend={handleSend}
            isSending={isSending}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#050608"
  },
  inner: {
    flex: 1
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    backgroundColor: "#050608"
  },
  title: {
    color: "#f9fafb",
    fontSize: 18,
    fontWeight: "700"
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4
  },
  messagesContent: {
    paddingBottom: 8
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 13,
    textAlign: "center",
    marginTop: 16
  },
  errorText: {
    color: "#f97373",
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center"
  }
});

export default GroupChatScreen;
