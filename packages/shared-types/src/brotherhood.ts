// packages/shared-types/src/brotherhood.ts

export type GroupId = string;
export type BrotherhoodMessageId = string;

export type BrotherhoodRole = "member" | "admin" | "moderator";

export interface BrotherhoodGroup {
  id: GroupId;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  isDefault: boolean;
  sortOrder: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface BrotherhoodGroupMember {
  id: string;
  groupId: GroupId;
  userId: string;
  role: BrotherhoodRole;
  joinedAt: string; // ISO
}

export interface BrotherhoodMessage {
  id: BrotherhoodMessageId;
  groupId: GroupId;
  userId: string;
  body: string;
  createdAt: string; // ISO
}

export interface BrotherhoodMessageWithAuthor extends BrotherhoodMessage {
  userName: string;
  userAvatarUrl?: string | null;
}
