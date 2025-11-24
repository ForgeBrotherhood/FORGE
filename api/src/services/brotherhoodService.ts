// api/src/services/brotherhoodService.ts
//
// Brotherhood free rooms: groups, memberships, and messages.

import { Group, GroupMembership, Message, User } from "@prisma/client";
import prisma from "../db/client";
import logger from "../config/logger";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export async function listGroups(
  onlyDefault = false
): Promise<Group[]> {
  return prisma.group.findMany({
    where: onlyDefault ? { isDefault: true } : {},
    orderBy: { sortOrder: "asc" }
  });
}

export async function getGroupById(groupId: string): Promise<Group> {
  const group = await prisma.group.findUnique({ where: { id: groupId } });

  if (!group) {
    throw createError(404, "Group not found");
  }

  return group;
}

export async function joinGroup(
  userId: string,
  groupId: string
): Promise<GroupMembership> {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) {
    throw createError(404, "Group not found");
  }

  const existing = await prisma.groupMembership.findFirst({
    where: { userId, groupId }
  });

  if (existing) {
    return existing;
  }

  const membership = await prisma.groupMembership.create({
    data: {
      userId,
      groupId
    }
  });

  logger.info("User joined group", { userId, groupId });

  return membership;
}

export async function leaveGroup(
  userId: string,
  groupId: string
): Promise<void> {
  await prisma.groupMembership.deleteMany({
    where: { userId, groupId }
  });

  logger.info("User left group", { userId, groupId });
}

export type MessageWithSender = Message & {
  sender: Pick<User, "id" | "name" | "avatarUrl">;
};

export async function getGroupMessages(
  groupId: string,
  limit = 50
): Promise<MessageWithSender[]> {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) {
    throw createError(404, "Group not found");
  }

  const messages = await prisma.message.findMany({
    where: { groupId },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          avatarUrl: true
        }
      }
    },
    orderBy: { createdAt: "asc" },
    take: limit
  });

  return messages;
}

export async function sendMessageToGroup(
  userId: string,
  groupId: string,
  body: string
): Promise<MessageWithSender> {
  if (!body.trim()) {
    throw createError(400, "Message body is required");
  }

  // Simple auto-join behavior: sending a message also joins the group.
  await joinGroup(userId, groupId);

  const message = await prisma.message.create({
    data: {
      body,
      userId,
      groupId
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          avatarUrl: true
        }
      }
    }
  });

  logger.info("New brotherhood message", {
    userId,
    groupId,
    messageId: message.id
  });

  return message;
}
