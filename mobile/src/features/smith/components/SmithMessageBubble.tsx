// mobile/src/features/smith/components/SmithMessageBubble.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SmithRole } from "../types";

interface SmithMessageBubbleProps {
  role: SmithRole;
  content: string;
}

const SmithMessageBubble: React.FC<SmithMessageBubbleProps> = ({
  role,
  content
}) => {
  const isSmith = role === "smith";

  return (
    <View
      style={[
        styles.container,
        isSmith ? styles.containerSmith : styles.containerUser
      ]}
    >
      <Text style={styles.label}>
        {isSmith ? "The Smith" : "You"}
      </Text>
      <View
        style={[
          styles.bubble,
          isSmith ? styles.bubbleSmith : styles.bubbleUser
        ]}
      >
        <Text
          style={[
            styles.text,
            isSmith ? styles.textSmith : styles.textUser
          ]}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    maxWidth: "85%"
  },
  containerSmith: {
    alignSelf: "flex-start"
  },
  containerUser: {
    alignSelf: "flex-end"
  },
  label: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 2,
    marginLeft: 4
  },
  bubble: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  bubbleSmith: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#f97316"
  },
  bubbleUser: {
    backgroundColor: "#f97316"
  },
  text: {
    fontSize: 14
  },
  textSmith: {
    color: "#f9fafb"
  },
  textUser: {
    color: "#111827"
  }
});

export default SmithMessageBubble;
