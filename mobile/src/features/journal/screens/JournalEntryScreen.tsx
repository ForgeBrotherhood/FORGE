// mobile/src/features/journal/screens/JournalEntryScreen.tsx

import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useJournalEntries } from "../hooks/useJournalEntries";
import MoodSelector from "../components/MoodSelector";
import type { JournalMood } from "../api/journalApi";

const JournalEntryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { addEntry, isSaving } = useJournalEntries();

  const [body, setBody] = useState("");
  const [mood, setMood] = useState<JournalMood | undefined>("okay");

  const handleSave = async () => {
    const trimmed = body.trim();
    if (!trimmed) {
      Alert.alert(
        "Empty entry",
        "Write a few sentences about what’s actually on your mind."
      );
      return;
    }

    const created = await addEntry(trimmed, mood);
    if (created) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.kicker}>NEW ENTRY</Text>
          <Text style={styles.title}>Put the day on paper</Text>
          <Text style={styles.subtitle}>
            No one else will see this. Talk about the grind, the wins, and the
            weak spots. The Smith can use this later to reflect with you.
          </Text>

          <View style={styles.section}>
            <MoodSelector value={mood} onChange={setMood} />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>What’s on your mind?</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Example: Today I felt pulled in ten directions. I hit my work goals, but I ignored my health..."
              placeholderTextColor="#6b7280"
              style={styles.textArea}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            isSaving && styles.primaryButtonDisabled
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.primaryButtonText}>
            {isSaving ? "Saving..." : "Save entry"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#050608",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  kicker: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4
  },
  title: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20
  },
  section: {
    marginBottom: 16
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 6
  },
  textArea: {
    minHeight: 160,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#020617",
    color: "#f9fafb",
    fontSize: 14,
    textAlignVertical: "top"
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center"
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default JournalEntryScreen;
