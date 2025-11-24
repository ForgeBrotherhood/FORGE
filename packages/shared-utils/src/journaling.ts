// packages/shared-utils/src/journaling.ts

import { JournalEntry, Mood } from "@forge/shared-types";

/**
 * Return a new array of entries sorted newest → oldest.
 */
export function sortEntriesNewestFirst(
  entries: JournalEntry[]
): JournalEntry[] {
  return [...entries].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

/**
 * Group entries by day (YYYY-MM-DD).
 */
export function groupEntriesByDay(
  entries: JournalEntry[]
): Record<string, JournalEntry[]> {
  const byDay: Record<string, JournalEntry[]> = {};
  for (const entry of entries) {
    const key = entry.createdAt.slice(0, 10); // ISO date prefix
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(entry);
  }
  return byDay;
}

export interface MoodCounts {
  [mood: string]: number;
}

/**
 * Count how often each mood appears.
 */
export function countMoods(entries: JournalEntry[]): MoodCounts {
  const counts: MoodCounts = {};
  for (const entry of entries) {
    const mood: Mood = entry.mood || "unknown";
    counts[mood] = (counts[mood] ?? 0) + 1;
  }
  return counts;
}

/**
 * Rough estimate of how long it would take to read an entry.
 */
export function estimateEntryReadTimeSeconds(
  entry: JournalEntry
): number {
  const words = entry.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordsPerMinute = 200;
  return Math.ceil((words / wordsPerMinute) * 60);
}

/**
 * Extract #tags from raw content (e.g. "#faith #fitness").
 */
export function extractTagsFromContent(content: string): string[] {
  const matches = content.match(/#([a-zA-Z0-9_\-]+)/g) || [];
  const tags = matches.map((m) => m.substring(1).toLowerCase());
  return Array.from(new Set(tags));
}
