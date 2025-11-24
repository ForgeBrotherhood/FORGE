// mobile/src/features/journal/api/journalApi.ts

export type JournalMood = "low" | "okay" | "high";

export interface JournalEntry {
  id: string;
  body: string;
  createdAt: string; // ISO timestamp
  mood?: JournalMood;
}

interface CreateJournalEntryPayload {
  body: string;
  mood?: JournalMood;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
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
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function fetchJournalEntries(): Promise<JournalEntry[]> {
  return request<JournalEntry[]>("/journal/entries");
}

export async function createJournalEntry(
  payload: CreateJournalEntryPayload
): Promise<JournalEntry> {
  return request<JournalEntry>("/journal/entries", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
