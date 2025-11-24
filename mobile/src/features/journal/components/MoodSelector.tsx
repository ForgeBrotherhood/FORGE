// mobile/src/features/journal/components/MoodSelector.tsx

import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { JournalMood } from "../api/journalApi";

interface MoodSelectorProps {
  value?: JournalMood;
  onChange: (mood: JournalMood) => void;
}

const MOODS: { key: JournalMood; label: string; emoji: string }[] = [
  { key: "low", label: "Heavy", emoji: "⬇️" },
  { key: "okay", label: "Steady", emoji: "😐" },
  { key: "high", label: "On Fire", emoji: "🔥" }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.row}>
        {MOODS.map((mood) => {
          const selected = value === mood.key;
          return (
            <TouchableOpacity
              key={mood.key}
              style={[
                styles.chip,
                selected && styles.chipSelected
              ]}
              onPress={() => onChange(mood.key)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.text,
                  selected && styles.textSelected
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  chip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    marginRight: 8
  },
  chipSelected: {
    borderColor: "#f97316",
    backgroundColor: "#111827"
  },
  emoji: {
    fontSize: 16,
    marginRight: 6
  },
  text: {
    color: "#9ca3af",
    fontSize: 13
  },
  textSelected: {
    color: "#f9fafb",
    fontWeight: "600"
  }
});

export default MoodSelector;
