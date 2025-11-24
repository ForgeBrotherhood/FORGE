// mobile/src/features/profile/screens/ProfileScreen.tsx

import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import EditProfileForm, {
  ProfileFormValues
} from "../components/EditProfileForm";
import { useAuth } from "../../auth/hooks/useAuth";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const initialValues: ProfileFormValues = {
    name: user?.name ?? "",
    bio: "",
    location: "",
    primaryPillar: ""
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const text = await response.text();
      let data: any = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }
      }

      if (!response.ok) {
        const message =
          (data && (data.message || data.error)) ||
          "Could not update profile. Please try again.";
        throw new Error(message);
      }

      Alert.alert("Profile", "Profile updated.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not update profile. Please try again.";
      Alert.alert("Profile", message);
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = user?.name || "brother";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.kicker}>PROFILE</Text>
          <Text style={styles.title}>Forge your identity</Text>
          <Text style={styles.subtitle}>
            Hey, {displayName}. This is how you appear in the Brotherhood and to
            The Smith. Keep it honest and simple. 
          </Text>
        </View>

        <EditProfileForm
          initialValues={initialValues}
          email={user?.email}
          isSubmitting={isSaving}
          onSubmit={handleSubmit}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your profile helps brothers know who they&apos;re talking to and gives
            The Smith context for your goals and struggles. 
          </Text>
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
  footer: {
    marginTop: 24
  },
  footerText: {
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 19
  }
});

export default ProfileScreen;
