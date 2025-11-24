// mobile/src/features/settings/components/DangerZoneSection.tsx

import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export interface DangerZoneSectionProps {
  onSignOut?: () => void | Promise<void>;
  onDeleteAccount?: () => void | Promise<void>;
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({
  onSignOut,
  onDeleteAccount
}) => {
  const handleSignOut = () => {
    Alert.alert(
      "Sign out",
      "You’ll stay in the Brotherhood, but this device will be signed out of FORGE.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: () => {
            try {
              onSignOut?.();
            } catch (err) {
              console.log("[FORGE] sign out error", err);
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Account deletion isn’t wired up yet. In production, this will permanently remove your data from FORGE.",
      [{ text: "OK" }]
    );

    // Later, replace with real deletion logic:
    // onDeleteAccount?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danger zone</Text>
      <Text style={styles.subtitle}>
        These actions affect your account and access. Treat them like fire – useful, but handled with care.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.signOutButton]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete account (coming later)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#111827",
    padding: 14
  },
  title: {
    color: "#fca5a5",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  subtitle: {
    color: "#fecaca",
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 18
  },
  button: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 8
  },
  signOutButton: {
    backgroundColor: "#b91c1c"
  },
  deleteButton: {
    backgroundColor: "#7f1d1d"
  },
  buttonText: {
    color: "#fee2e2",
    fontSize: 14,
    fontWeight: "700"
  }
});

export default DangerZoneSection;
