// api/src/services/notificationService.ts
//
// Stub notification service – for emails, push, etc.
// Right now it just logs; you can wire a real provider later.

import logger from "../config/logger";

export async function notifySubscriptionStatusChanged(
  userId: string,
  status: string,
  isActive: boolean
): Promise<void> {
  logger.info("Subscription status changed", {
    userId,
    status,
    isActive
  });
}

export async function notifyNewBrotherhoodMessage(
  _recipientUserId: string,
  _groupId: string,
  _messageId: string
): Promise<void> {
  // Implement push/email notifications later.
  logger.debug("notifyNewBrotherhoodMessage (stub)");
}

export async function notifyJournalEntryCreated(
  _userId: string,
  _entryId: string
): Promise<void> {
  logger.debug("notifyJournalEntryCreated (stub)");
}
