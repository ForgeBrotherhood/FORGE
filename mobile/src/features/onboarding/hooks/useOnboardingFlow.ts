// mobile/src/features/onboarding/hooks/useOnboardingFlow.ts

import { useCallback, useState } from "react";
import { Alert } from "react-native";

export type OnboardingPrimaryPillar =
  | "Business"
  | "Fitness"
  | "Faith"
  | "Discipline"
  | "Recovery"
  | "";

export interface OnboardingValuesInput {
  primaryPillar: OnboardingPrimaryPillar;
  mainGoal: string;
  biggestStruggle: string;
}

export interface OnboardingInterestsInput {
  wantsBrotherhood: boolean;
  wantsSmith: boolean;
  wantsDailyPrompts: boolean;
  wantsAccountability: boolean;
}

export function useOnboardingFlow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitValues = useCallback(
    async (values: OnboardingValuesInput): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      try {
        // TODO: connect to backend API once /users/profile or similar exists.
        // For now this is just a stub so the UI has a place to send data.
        console.log("[FORGE] Onboarding values", values);
        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
        Alert.alert("Could not save", message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const submitInterests = useCallback(
    async (interests: OnboardingInterestsInput): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      try {
        console.log("[FORGE] Onboarding interests", interests);
        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
        Alert.alert("Could not save", message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    isSubmitting,
    error,
    submitValues,
    submitInterests
  };
}
