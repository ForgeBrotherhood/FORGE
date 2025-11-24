// mobile/src/features/settings/screens/SettingsScreen.tsx

import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import SettingToggle from "../components/SettingToggle";
import DangerZoneSection from "../components/DangerZoneSection";
import { useSettings } from "../hooks/useSettings";
import { usePushNotifications } from "../../notifications/hooks/usePushNotifications";

const SettingsScreen: React.FC = () => {
  const { settings, isSaving, setBoolean } = useSettings();
  const {
    status: pushStatus,
    isRequesting,
    error: pushError,
    requestPermissionAndRegister
  } = usePushNotifications();

  const notificationsEnabled = pushStatus === "granted";

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>SETTINGS</Text>
          <Text style={styles.title}>Tune your Forge</Text>
          <Text style={styles.subtitle}>
            Keep the Brotherhood and The Smith in your rhythm without letting
            them become noise. This is where you tune the knobs. :contentReference[oaicite:1]{index=1}
          </Text>
        </View>

        {/* App section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <SettingToggle
            label="Haptic feedback"
            description="Subtle vibration on key actions (posting, completing prompts)."
            value={settings.enableHaptics}
            onValueChange={(value) => setBoolean("enableHaptics", value)}
            disabled={isSaving}
          />
        </View>

        {/* Notifications section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          {pushError ? (
            <Text style={styles.errorText}>{pushError}</Text>
          ) : null}

          {notificationsEnabled ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Push notifications enabled</Text>
              <Text style={styles.cardBody}>
                This device is registered for FORGE notifications. Later we’ll tie
                this into daily prompts, weekly reviews, and Brotherhood alerts.
              </Text>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Push notifications off</Text>
              <Text style={styles.cardBody}>
                When you’re ready, enable notifications so Forge can nudge you at
                the right moments – not all day, just high-signal reminders.
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={requestPermissionAndRegister}
                disabled={isRequesting}
              >
                {isRequesting ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buttonText}>Enable notifications</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Danger zone */}
        <DangerZoneSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050608"
  },
  scroll: {
    flex: 1
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
    marginTop: 18
  },
  sectionTitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 6
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    padding: 14
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4
  },
  cardBody: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10
  },
  button: {
    marginTop: 4,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f97316"
  },
  buttonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700"
  },
  errorText: {
    color: "#f97373",
    fontSize: 12,
    marginBottom: 6
  }
});

export default SettingsScreen;
