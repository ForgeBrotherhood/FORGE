// mobile/src/features/settings/screens/AccountSettingsScreen.tsx

import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useAuth } from "../../auth/hooks/useAuth";

const AccountSettingsScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout?.();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong signing out.";
      Alert.alert("Sign out", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.subtitle}>
            Basic account details. Keep this simple and accurate – it&apos;s how
            the Brotherhood and The Smith know you.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email ?? "Unknown"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Display name</Text>
          <Text style={styles.value}>{user?.name ?? "Not set"}</Text>
          <Text style={styles.hint}>
            You can edit your name and profile details from the Profile tab.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={handleLogout}
        >
          <Text style={styles.dangerButtonText}>Sign out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          In a later version, you&apos;ll be able to request full account deletion
          and data export directly from here.
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
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    padding: 12,
    marginBottom: 12
  },
  label: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 4
  },
  value: {
    color: "#e5e7eb",
    fontSize: 15
  },
  hint: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 4
  },
  dangerButton: {
    marginTop: 24,
    backgroundColor: "#ef4444",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center"
  },
  dangerButtonText: {
    color: "#f9fafb",
    fontSize: 15,
    fontWeight: "700"
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 16,
    lineHeight: 18
  }
});

export default AccountSettingsScreen;
