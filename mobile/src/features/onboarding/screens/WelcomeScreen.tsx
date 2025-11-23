// mobile/src/features/onboarding/screens/WelcomeScreen.tsx

import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "OnboardingWelcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleBegin = () => {
    navigation.navigate("OnboardingValues");
  };

  const handleSkip = () => {
    // For now, just go back to Login.
    // Later, once root auth state is wired up, this will send users into MainTabs.
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.kicker}>WELCOME TO</Text>
          <Text style={styles.title}>FORGE</Text>
          <Text style={styles.subtitle}>
            This is where men in the grind get sharper. Answer a couple of quick
            questions so the Brotherhood and The Smith can meet you where you
            are.
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>What you can expect:</Text>
          <Text style={styles.bullet}>
            • A Brotherhood of men who take effort seriously.
          </Text>
          <Text style={styles.bullet}>
            • The Smith – your AI mentor – when you&apos;re ready to go deeper.
          </Text>
          <Text style={styles.bullet}>
            • Daily check-ins, weekly reflection, and real accountability.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBegin}>
            <Text style={styles.primaryButtonText}>Begin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 72,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  header: {
    gap: 8
  },
  kicker: {
    color: "#9ca3af",
    letterSpacing: 2,
    fontSize: 12,
    textTransform: "uppercase"
  },
  title: {
    color: "#f9fafb",
    fontSize: 32,
    fontWeight: "800"
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20
  },
  body: {
    gap: 8
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  bullet: {
    color: "#9ca3af",
    fontSize: 14
  },
  footer: {
    gap: 8
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 8
  },
  skipText: {
    color: "#6b7280",
    fontSize: 13
  }
});

export default WelcomeScreen;
