// mobile/src/features/smith/screens/SmithWeeklyReviewScreen.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SmithWeeklyReviewScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.kicker}>WEEKLY FORGE</Text>
        <Text style={styles.title}>Weekly review with The Smith</Text>
        <Text style={styles.subtitle}>
          Once a week, step back from the grind and let The Smith walk you through
          what the week taught you – wins, failures, and next moves.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to use this:</Text>
        <Text style={styles.cardText}>
          • Pick one day each week to review.{"\n"}
          • Open The Smith chat and start with a prompt like:{" "}
          “Weekly review: What did this week teach me?”{"\n"}
          • Be brutally honest. The more honest you are, the sharper the insight.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Later, this screen can deep-link straight into a “Weekly Review” session
          in The Smith chat. For now it&apos;s a simple guide inside the app.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050608",
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  header: {
    gap: 8
  },
  kicker: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  title: {
    color: "#f9fafb",
    fontSize: 22,
    fontWeight: "700"
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    padding: 16
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6
  },
  cardText: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20
  },
  footer: {
    marginTop: 16
  },
  footerText: {
    color: "#6b7280",
    fontSize: 13
  }
});

export default SmithWeeklyReviewScreen;
