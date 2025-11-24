// mobile/src/features/brotherhood/components/TypingIndicator.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TypingIndicatorProps {
  visible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.dot}>•</Text>
      <Text style={styles.dot}>•</Text>
      <Text style={styles.dot}>•</Text>
      <Text style={styles.text}>Someone is typing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  dot: {
    color: "#9ca3af",
    fontSize: 14,
    marginRight: 2
  },
  text: {
    color: "#6b7280",
    fontSize: 12,
    marginLeft: 4
  }
});

export default TypingIndicator;
