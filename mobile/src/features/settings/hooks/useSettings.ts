// mobile/src/features/settings/hooks/useSettings.ts

import { useCallback, useState } from "react";

export type AppSettings = {
  /**
   * Whether to use subtle haptic feedback on key actions.
   * We’ll later wire this into a global haptics helper.
   */
  enableHaptics: boolean;
};

const DEFAULT_SETTINGS: AppSettings = {
  enableHaptics: true
};

/**
 * Lightweight local settings hook for v1.
 *
 * Right now it’s purely in-memory so you can focus on wiring the UI.
 * Later we can persist to AsyncStorage or a backend endpoint and keep
 * the API the same.
 */
export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const setBoolean = useCallback(
    (key: keyof AppSettings, value: boolean) => {
      setIsSaving(true);
      setSettings((prev) => ({
        ...prev,
        [key]: value
      }));
      // Placeholder “save delay” to keep the API async-friendly.
      // Swap this out for real persistence when ready.
      setTimeout(() => {
        setIsSaving(false);
      }, 150);
    },
    []
  );

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isSaving,
    setBoolean,
    resetToDefaults
  };
}
