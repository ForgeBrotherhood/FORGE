// mobile/src/features/settings/screens/SettingsScreen.tsx

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

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const goTo = (routeName: string) => {
    if (navigation && typeof navigation.navigate === "function") {
      navigation.navigate(routeName as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.kicker}>SETTINGS</Text>
          <Text style={styles.title}>Tune your Forge</Text>
          <Text style={styles.subtitle}>
            Adjust notifications, account details, and the fine print so the app
            stays sharp and quiet in the background while you work.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => goTo("AccountSettings")}
          >
            <View>
              <Text style={styles.rowLabel}>Profile & account</Text>
              <Text style={styles.rowValue}>Name, email, login</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => goTo("NotificationSettings")}
          >
            <View>
              <Text style={styles.rowLabel}>Notification preferences</Text>
              <Text style={styles.rowValue}>
                Brotherhood, Smith, reminders
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => goTo("Upgrade")}
          >
            <View>
              <Text style={styles.rowLabel}>The Smith subscription</Text>
              <Text style={styles.rowValue}>Manage or upgrade</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => goTo("Legal")}
          >
            <View>
              <Text style={styles.rowLabel}>Legal & privacy</Text>
              <Text style={styles.rowValue}>Terms, privacy, Forge Code</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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
    paddingTop: 72,
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
  section: {
    marginTop: 16
  },
  sectionTitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 6
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
    justifyContent: "space-between"
  },
  rowLabel: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600"
  },
  rowValue: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2
  },
  chevron: {
    color: "#6b7280",
    fontSize: 18,
    marginLeft: 8
  }
});

export default SettingsScreen;
