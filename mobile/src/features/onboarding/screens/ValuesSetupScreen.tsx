// mobile/src/features/onboarding/screens/ValuesSetupScreen.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "../../../navigation/types";
import {
  OnboardingPrimaryPillar,
  type OnboardingValuesInput,
  useOnboardingFlow
} from "../hooks/useOnboardingFlow";

type Props = NativeStackScreenProps<AuthStackParamList, "OnboardingValues">;

const PILLARS: { key: OnboardingPrimaryPillar; label: string; subtitle: string }[] = [
  {
    key: "Business",
    label: "Business / Career",
    subtitle: "Building your work, money, and mission."
  },
  {
    key: "Fitness",
    label: "Body / Fitness",
    subtitle: "Strength, discipline, health and energy."
  },
  {
    key: "Faith",
    label: "Faith / Spirit",
    subtitle: "Grounding yourself in something higher."
  },
  {
    key: "Discipline",
    label: "Discipline / Focus",
    subtitle: "Habits, attention, and self-control."
  },
  {
    key: "Recovery",
    label: "Recovery / Healing",
    subtitle: "Breaking patterns, rebuilding from setbacks."
  }
];

const ValuesSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [primaryPillar, setPrimaryPillar] = useState<OnboardingPrimaryPillar>("");
  const [mainGoal, setMainGoal] = useState("");
  const [biggestStruggle, setBiggestStruggle] = useState("");

  const { submitValues, isSubmitting } = useOnboardingFlow();

  const handleNext = async () => {
    if (!primaryPillar) {
      Alert.alert("Pick your focus", "Choose the area you are most focused on right now.");
      return;
    }

    const payload: OnboardingValuesInput = {
      primaryPillar,
      mainGoal: mainGoal.trim(),
      biggestStruggle: biggestStruggle.trim()
    };

    const ok = await submitValues(payload);
    if (ok) {
      navigation.navigate("OnboardingInterests");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.kicker}>STEP 1 OF 2</Text>
          <Text style={styles.title}>What are you forging right now?</Text>
          <Text style={styles.subtitle}>
            Pick the area that matters most in this season. You can work on everything, but we’ll start
            where the fire is hottest.
          </Text>

          <View style={styles.pillarsContainer}>
            {PILLARS.map((pillar) => {
              const selected = primaryPillar === pillar.key;
              return (
                <TouchableOpacity
                  key={pillar.key}
                  style={[
                    styles.pillarCard,
                    selected && styles.pillarCardSelected
                  ]}
                  onPress={() => setPrimaryPillar(pillar.key)}
                >
                  <Text
                    style={[
                      styles.pillarLabel,
                      selected && styles.pillarLabelSelected
                    ]}
                  >
                    {pillar.label}
                  </Text>
                  <Text
                    style={[
                      styles.pillarSubtitle,
                      selected && styles.pillarSubtitleSelected
                    ]}
                  >
                    {pillar.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputs}>
            <Text style={styles.label}>What’s your primary goal right now?</Text>
            <TextInput
              value={mainGoal}
              onChangeText={setMainGoal}
              placeholder="Example: Grow my business to replace my job income."
              placeholderTextColor="#6b7280"
              style={styles.input}
              multiline
            />

            <Text style={styles.label}>Where do you feel the weakest or least disciplined?</Text>
            <TextInput
              value={biggestStruggle}
              onChangeText={setBiggestStruggle}
              placeholder="Example: Consistency, focus, avoiding distractions at night."
              placeholderTextColor="#6b7280"
              style={[styles.input, styles.inputLast]}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#111827" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
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
  pillarsContainer: {
    marginTop: 8,
    gap: 8
  },
  pillarCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111827",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#020617"
  },
  pillarCardSelected: {
    borderColor: "#f97316",
    backgroundColor: "#111827"
  },
  pillarLabel: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600"
  },
  pillarLabelSelected: {
    color: "#f9fafb"
  },
  pillarSubtitle: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 2
  },
  pillarSubtitleSelected: {
    color: "#d1d5db"
  },
  inputs: {
    marginTop: 20,
    gap: 10
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 4
  },
  input: {
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f9fafb",
    fontSize: 14
  },
  inputLast: {
    minHeight: 80,
    textAlignVertical: "top"
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

export default ValuesSetupScreen;
