// api/src/services/journalService.ts
//
// Journal CRUD logic.

import { JournalEntry } from "@prisma/client";
import prisma from "../db/client";
import logger from "../config/logger";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export async function listEntries(
  userId: string
): Promise<JournalEntry[]> {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return entries;
}

export async function getEntryById(
  userId: string,
  entryId: string
): Promise<JournalEntry> {
  const entry = await prisma.journalEntry.findFirst({
    where: {
      id: entryId,
      userId
    }
  });

  if (!entry) {
    throw createError(404, "Journal entry not found");
  }

  return entry;
}

export interface CreateJournalInput {
  title?: string;
  content: string;
  mood?: string;
}

export async function createEntry(
  userId: string,
  input: CreateJournalInput
): Promise<JournalEntry> {
  const entry = await prisma.journalEntry.create({
    data: {
      userId,
      title: input.title,
      content: input.content,
      mood: input.mood
    }
  });

  logger.info("Journal entry created", { userId, entryId: entry.id });

  return entry;
}

export interface UpdateJournalInput {
  title?: string;
  content?: string;
  mood?: string;
}

export async function updateEntry(
  userId: string,
  entryId: string,
  input: UpdateJournalInput
): Promise<JournalEntry> {
  const existing = await prisma.journalEntry.findFirst({
    where: { id: entryId, userId }
  });

  if (!existing) {
    throw createError(404, "Journal entry not found");
  }

  const entry = await prisma.journalEntry.update({
    where: { id: entryId },
    data: {
      title: input.title ?? existing.title,
      content: input.content ?? existing.content,
      mood: input.mood ?? existing.mood
    }
  });

  logger.info("Journal entry updated", { userId, entryId });

  return entry;
}

export async function deleteEntry(
  userId: string,
  entryId: string
): Promise<void> {
  const existing = await prisma.journalEntry.findFirst({
    where: { id: entryId, userId }
  });

  if (!existing) {
    throw createError(404, "Journal entry not found");
  }

  await prisma.journalEntry.delete({ where: { id: entryId } });

  logger.info("Journal entry deleted", { userId, entryId });
}
