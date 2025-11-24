// mobile/src/features/journal/components/JournalCard.tsx

import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { JournalEntry } from "../api/journalApi";

interface JournalCardProps {
  entry: JournalEntry;
  onPress?: () => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, onPress }) => {
  const date = new Date(entry.createdAt);
  const dateLabel = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  let moodLabel = "";
  let moodColor = "#6b7280";

  if (entry.mood === "high") {
    moodLabel = "On fire";
    moodColor = "#f97316";
  } else if (entry.mood === "low") {
    moodLabel = "Heavy";
    moodColor = "#f97373";
  } else if (entry.mood === "okay") {
    moodLabel = "Steady";
    moodColor = "#22c55e";
  }

  const preview =
    entry.body.length > 140
      ? `${entry.body.slice(0, 137).trimEnd()}...`
      : entry.body;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text style={styles.date}>{dateLabel}</Text>
        {moodLabel ? (
          <Text style={[styles.mood, { color: moodColor }]}>
            {moodLabel}
          </Text>
        ) : null}
      </View>
      <Text style={styles.body}>{preview}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
    padding: 12,
    marginBottom: 10
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  date: {
    color: "#9ca3af",
    fontSize: 12
  },
  mood: {
    fontSize: 12,
    fontWeight: "600"
  },
  body: {
    color: "#e5e7eb",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20
  }
});

export default JournalCard;
