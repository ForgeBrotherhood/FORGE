// mobile/src/features/journal/screens/JournalHomeScreen.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useJournalEntries } from "../hooks/useJournalEntries";
import JournalCard from "../components/JournalCard";

const JournalHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { entries, isLoading } = useJournalEntries();

  const latestEntries = entries.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>REFLECTION</Text>
          <Text style={styles.title}>Journal in the Forge</Text>
          <Text style={styles.subtitle}>
            This is your private space to be completely honest about the grind.
            No likes, no comments – just you and the page.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              // TODO: ensure "JournalEntry" route exists in your navigator.
              navigation.navigate("JournalEntry");
            }}
          >
            <Text style={styles.primaryButtonText}>Start new entry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // TODO: ensure "JournalHistory" route exists in your navigator.
              navigation.navigate("JournalHistory");
            }}
          >
            <Text style={styles.secondaryButtonText}>View history</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent entries</Text>
          {isLoading && entries.length === 0 ? (
            <Text style={styles.placeholder}>Loading your journal...</Text>
          ) : latestEntries.length === 0 ? (
            <Text style={styles.placeholder}>
              No entries yet. Your first one doesn&apos;t have to be perfect – it
              just has to be honest.
            </Text>
          ) : (
            latestEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} />
            ))
          )}
        </View>
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
    marginBottom: 24
  },
  kicker: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  title: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20
  },
  actions: {
    marginBottom: 24
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#111827"
  },
  secondaryButtonText: {
    color: "#e5e7eb",
    fontSize: 14
  },
  section: {
    marginTop: 8
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8
  },
  placeholder: {
    color: "#6b7280",
    fontSize: 13
  }
});

export default JournalHomeScreen;
