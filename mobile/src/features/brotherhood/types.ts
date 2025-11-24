// mobile/src/features/brotherhood/types.ts

// A Brotherhood "room" (Business, Fitness, Faith, etc.)
export interface Group {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  isDefault?: boolean;
  sortOrder?: number;
}

// A single message inside a group chat.
export interface GroupMessage {
  id: string;
  groupId: string;
  body: string;
  createdAt: string; // ISO timestamp from the backend
  senderId: string;
  senderName?: string;
}

// Optionally used for list UIs that show last message, unread count, etc.
export interface GroupWithLastMessage extends Group {
  lastMessage?: GroupMessage;
  unreadCount?: number;
}
