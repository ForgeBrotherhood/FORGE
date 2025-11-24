// packages/shared-utils/src/scoring.ts

import { JournalEntry } from "@forge/shared-types";

export interface StreakScoreInput {
  consecutiveDays: number;
  longestStreak: number;
}

export type StreakScoreLabel = "cold" | "warming_up" | "hot";

export interface StreakScore {
  score: number; // 0–100
  label: StreakScoreLabel;
}

/**
 * Turn a journaling/engagement streak into a 0–100 score and rough label.
 */
export function computeStreakScore(input: StreakScoreInput): StreakScore {
  const { consecutiveDays, longestStreak } = input;

  const maxStreak = Math.max(longestStreak, consecutiveDays, 1);
  const denominator = Math.max(7, maxStreak); // 7 days is "baseline"
  const ratio = Math.min(1, consecutiveDays / denominator);
  const score = Math.round(ratio * 100);

  let label: StreakScoreLabel;
  if (score < 30) label = "cold";
  else if (score < 70) label = "warming_up";
  else label = "hot";

  return { score, label };
}

export interface JournalingConsistency {
  daysWithEntries: number;
  totalDays: number;
  ratio: number; // 0–1
}

/**
 * Given recent journal entries and a window in days, compute how consistent
 * the user has been about showing up.
 */
export function computeJournalingConsistency(
  entries: JournalEntry[],
  daysWindow: number
): JournalingConsistency {
  if (daysWindow <= 0) {
    return { daysWithEntries: 0, totalDays: 0, ratio: 0 };
  }

  const now = new Date();
  const cutoff = new Date(
    now.getTime() - daysWindow * 24 * 60 * 60 * 1000
  );

  const days = new Set<string>();

  for (const entry of entries) {
    const created = new Date(entry.createdAt);
    if (created < cutoff) continue;
    const key = created.toISOString().slice(0, 10); // YYYY-MM-DD
    days.add(key);
  }

  const daysWithEntries = days.size;
  const totalDays = daysWindow;
  const ratio = totalDays ? daysWithEntries / totalDays : 0;

  return { daysWithEntries, totalDays, ratio };
}
