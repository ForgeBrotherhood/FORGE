// mobile/src/features/smith/types.ts

export type SmithRole = "user" | "smith";

export type SmithMode = "default" | "daily" | "weekly";

export interface SmithMessage {
  id: string;
  role: SmithRole;
  content: string;
  createdAt: string; // ISO timestamp
}
