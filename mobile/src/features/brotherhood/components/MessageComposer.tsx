// mobile/src/features/brotherhood/components/MessageComposer.tsx

import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

interface MessageComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending?: boolean;
  disabled?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  value,
  onChangeText,
  onSend,
  isSending,
  disabled
}) => {
  const canSend = !!value.trim() && !isSending && !disabled;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Type your message..."
        placeholderTextColor="#6b7280"
        multiline
      />
      <TouchableOpacity
        style={[styles.button, !canSend && styles.buttonDisabled]}
        onPress={onSend}
        disabled={!canSend}
      >
        <Text style={styles.buttonText}>
          {isSending ? "..." : "Send"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderTopColor: "#111827"
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#0b1120",
    color: "#f9fafb",
    fontSize: 14,
    marginRight: 8
  },
  button: {
    alignSelf: "flex-end",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f97316",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600"
  }
});

export default MessageComposer;
