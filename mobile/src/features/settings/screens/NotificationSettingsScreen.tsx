// mobile/src/features/settings/screens/NotificationSettingsScreen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";

const NotificationSettingsScreen: React.FC = () => {
  const [brotherhoodPush, setBrotherhoodPush] = useState(true);
  const [smithReminders, setSmithReminders] = useState(true);
  const [journalReminders, setJournalReminders] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);

  // TODO: Wire these switches to a real backend / push-notification settings API.

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            Stay in the loop without drowning in pings. Choose what matters:
            Brotherhood replies, Smith check-ins, and gentle streak reminders.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brotherhood</Text>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Room activity</Text>
              <Text style={styles.description}>
                New replies, mentions, and room-level announcements.
              </Text>
            </View>
            <Switch
              value={brotherhoodPush}
              onValueChange={setBrotherhoodPush}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Smith</Text>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Check-in reminders</Text>
              <Text style={styles.description}>
                Nudges for daily reflections and weekly Forge reviews.
              </Text>
            </View>
            <Switch
              value={smithReminders}
              onValueChange={setSmithReminders}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journal & streaks</Text>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Journal prompts</Text>
              <Text style={styles.description}>
                Occasional prompts to keep your writing habit alive.
              </Text>
            </View>
            <Switch
              value={journalReminders}
              onValueChange={setJournalReminders}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product updates</Text>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>New features & drops</Text>
              <Text style={styles.description}>
                Rare, high-signal updates when we ship big changes.
              </Text>
            </View>
            <Switch
              value={productUpdates}
              onValueChange={setProductUpdates}
            />
          </View>
        </View>

        <Text style={styles.footerText}>
          These settings control how often Forge taps you on the shoulder. You
          can always change them later.
        </Text>
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
    paddingTop: 72,
    paddingBottom: 32
  },
  header: {
    marginBottom: 24
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
  section: {
    marginBottom: 18
  },
  sectionTitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  rowText: {
    flex: 1,
    paddingRight: 12
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 2
  },
  description: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 18
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18
  }
});

export default NotificationSettingsScreen;
