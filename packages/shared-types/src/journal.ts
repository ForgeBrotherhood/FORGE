// packages/shared-types/src/journal.ts

export type Mood = "low" | "medium" | "high" | "mixed" | "unknown";

export interface JournalEntry {
  id: string;
  userId: string;
  title?: string | null;
  content: string;
  mood: Mood;
  tags: string[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface JournalStats {
  totalEntries: number;
  streakDays: number;
  lastEntryDate?: string; // ISO YYYY-MM-DD
}
