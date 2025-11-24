// mobile/src/features/brotherhood/components/MessageBubble.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import type { GroupMessage } from "../types";

interface MessageBubbleProps {
  message: GroupMessage;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.containerOwn : styles.containerOther
      ]}
    >
      {!isOwn && !!message.senderName && (
        <Text style={styles.senderName}>{message.senderName}</Text>
      )}
      <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
        <Text style={styles.body}>{message.body}</Text>
      </View>
      <Text style={styles.timestamp}>
        {/* TODO: format createdAt properly when we add a date util */}
        {new Date(message.createdAt).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: "80%"
  },
  containerOwn: {
    alignSelf: "flex-end",
    alignItems: "flex-end"
  },
  containerOther: {
    alignSelf: "flex-start",
    alignItems: "flex-start"
  },
  senderName: {
    color: "#9ca3af",
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 4
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  bubbleOwn: {
    backgroundColor: "#f97316"
  },
  bubbleOther: {
    backgroundColor: "#111827"
  },
  body: {
    color: "#f9fafb",
    fontSize: 14
  },
  timestamp: {
    color: "#6b7280",
    fontSize: 10,
    marginTop: 2,
    marginHorizontal: 4
  }
});

export default MessageBubble;
