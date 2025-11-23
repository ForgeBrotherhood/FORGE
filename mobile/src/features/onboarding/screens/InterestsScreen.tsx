// mobile/src/features/onboarding/screens/InterestsScreen.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "../../../navigation/types";
import {
  type OnboardingInterestsInput,
  useOnboardingFlow
} from "../hooks/useOnboardingFlow";

type Props = NativeStackScreenProps<AuthStackParamList, "OnboardingInterests">;

interface ToggleOption {
  key: keyof OnboardingInterestsInput;
  title: string;
  subtitle: string;
}

const InterestsScreen: React.FC<Props> = ({ navigation }) => {
  const [interests, setInterests] = useState<OnboardingInterestsInput>({
    wantsBrotherhood: true,
    wantsSmith: true,
    wantsDailyPrompts: true,
    wantsAccountability: true
  });

  const { submitInterests, isSubmitting } = useOnboardingFlow();

  const toggle = (key: keyof OnboardingInterestsInput) => {
    setInterests((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFinish = async () => {
    const ok = await submitInterests(interests);
    if (ok) {
      // For now, send them back to Login.
      // Later, once auth state is wired, this will transition into the main tabs.
      navigation.navigate("Login");
    }
  };

  const options: ToggleOption[] = [
    {
      key: "wantsBrotherhood",
      title: "Deep Brotherhood",
      subtitle: "Real men, real conversations, no fluff."
    },
    {
      key: "wantsSmith",
      title: "The Smith (AI Mentor)",
      subtitle: "Private 1:1 coaching and reflection when you’re ready for it."
    },
    {
      key: "wantsDailyPrompts",
      title: "Daily & Weekly Prompts",
      subtitle: "Structured reflection so days don’t blur together."
    },
    {
      key: "wantsAccountability",
      title: "Accountability & Streaks",
      subtitle: "Track your consistency and let the Brotherhood see your grind."
    }
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.kicker}>STEP 2 OF 2</Text>
          <Text style={styles.title}>How should Forge support you?</Text>
          <Text style={styles.subtitle}>
            Pick what matters most. We&apos;ll tune your experience around these priorities.
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((opt) => {
              const active = interests[opt.key];
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.optionCard,
                    active && styles.optionCardActive
                  ]}
                  onPress={() => toggle(opt.key)}
                >
                  <View style={styles.optionHeader}>
                    <View
                      style={[
                        styles.checkbox,
                        active && styles.checkboxActive
                      ]}
                    >
                      {active && <View style={styles.checkboxDot} />}
                    </View>
                    <Text
                      style={[
                        styles.optionTitle,
                        active && styles.optionTitleActive
                      ]}
                    >
                      {opt.title}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionSubtitle,
                      active && styles.optionSubtitleActive
                    ]}
                  >
                    {opt.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={handleFinish}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#111827" />
          ) : (
            <Text style={styles.primaryButtonText}>Finish</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#050608",
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    justifyContent: "space-between"
  },
  kicker: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4
  },
  title: {
    color: "#f9fafb",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16
  },
  optionsContainer: {
    gap: 10
  },
  optionCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111827",
    backgroundColor: "#020617",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  optionCardActive: {
    borderColor: "#f97316",
    backgroundColor: "#111827"
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#4b5563",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  checkboxActive: {
    borderColor: "#f97316"
  },
  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#f97316"
  },
  optionTitle: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600"
  },
  optionTitleActive: {
    color: "#f9fafb"
  },
  optionSubtitle: {
    color: "#6b7280",
    fontSize: 13
  },
  optionSubtitleActive: {
    color: "#d1d5db"
  },
  primaryButton: {
    backgroundColor: "#f97316",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center"
  },
  primaryButtonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default InterestsScreen;
