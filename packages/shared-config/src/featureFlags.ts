// packages/shared-config/src/featureFlags.ts

export interface FeatureFlags {
  brotherhood: {
    voiceRooms: boolean;
    streakLeaderboards: boolean;
  };
  smith: {
    weeklyReview: boolean;
    dailyCheckIns: boolean;
  };
  journal: {
    moodTracking: boolean;
    tags: boolean;
  };
}

let currentFlags: FeatureFlags = {
  brotherhood: {
    voiceRooms: false, // can flip on when you add audio
    streakLeaderboards: true
  },
  smith: {
    weeklyReview: true,
    dailyCheckIns: true
  },
  journal: {
    moodTracking: true,
    tags: true
  }
};

export function getFeatureFlags(): FeatureFlags {
  return currentFlags;
}

/**
 * Optional: allow overriding at runtime (e.g. in backend bootstrap).
 */
export function setFeatureFlags(partial: Partial<FeatureFlags>) {
  currentFlags = {
    ...currentFlags,
    ...partial,
    brotherhood: {
      ...currentFlags.brotherhood,
      ...(partial.brotherhood ?? {})
    },
    smith: {
      ...currentFlags.smith,
      ...(partial.smith ?? {})
    },
    journal: {
      ...currentFlags.journal,
      ...(partial.journal ?? {})
    }
  };
}
