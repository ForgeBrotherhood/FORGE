// mobile/src/features/journal/screens/JournalHistoryScreen.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useJournalEntries } from "../hooks/useJournalEntries";
import JournalCard from "../components/JournalCard";

const JournalHistoryScreen: React.FC = () => {
  const { entries, isLoading } = useJournalEntries();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your past entries</Text>
          <Text style={styles.subtitle}>
            Scroll back through what you’ve written. Patterns show up when you
            look at more than just today.
          </Text>
        </View>

        {isLoading && entries.length === 0 ? (
          <Text style={styles.placeholder}>Loading your journal...</Text>
        ) : entries.length === 0 ? (
          <Text style={styles.placeholder}>
            No entries yet. Once you start writing, this screen becomes a map of
            who you’re becoming.
          </Text>
        ) : (
          entries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608"
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32
  },
  header: {
    marginBottom: 16
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
    lineHeight: 20
  },
  placeholder: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 12
  }
});

export default JournalHistoryScreen;
