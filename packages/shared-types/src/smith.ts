// packages/shared-types/src/smith.ts

export type SmithMode = "daily" | "weekly" | "freeform";

export type SmithMessageRole = "user" | "smith" | "system";

export interface SmithConversation {
  id: string;
  userId: string;
  title?: string | null;
  mode: SmithMode;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface SmithMessage {
  id: string;
  conversationId: string;
  role: SmithMessageRole;
  body: string;
  createdAt: string; // ISO
}

export interface SmithWeeklySummary {
  id: string;
  conversationId: string;
  highlights: string[];
  themes: string[];
  createdAt: string; // ISO
}
