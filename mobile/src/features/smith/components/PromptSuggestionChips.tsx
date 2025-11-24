// mobile/src/features/smith/components/PromptSuggestionChips.tsx

import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface PromptSuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

const DEFAULT_PROMPTS: string[] = [
  "Daily check-in: How did I show up today?",
  "Weekly review: What did this week teach me?",
  "What am I avoiding right now?",
  "Help me plan tomorrow’s top 3 moves."
];

const PromptSuggestionChips: React.FC<PromptSuggestionChipsProps> = ({
  onSelect
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {DEFAULT_PROMPTS.map((prompt) => (
          <TouchableOpacity
            key={prompt}
            style={styles.chip}
            onPress={() => onSelect(prompt)}
          >
            <Text style={styles.chipText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 4
  },
  row: {
    paddingVertical: 4
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    backgroundColor: "#020617"
  },
  chipText: {
    color: "#e5e7eb",
    fontSize: 12
  }
});

export default PromptSuggestionChips;
