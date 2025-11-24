// api/src/services/userService.ts
//
// User domain logic (profile, safe user projection).

import { User } from "@prisma/client";
import prisma from "../db/client";
import logger from "../config/logger";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export interface SafeUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  streakCount: number;
  lastActiveAt: Date | null;
  createdAt: Date;
}

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    avatarUrl: user.avatarUrl ?? null,
    bio: user.bio ?? null,
    streakCount: user.streakCount,
    lastActiveAt: user.lastActiveAt ?? null,
    createdAt: user.createdAt
  };
}

export async function getUserById(userId: string): Promise<SafeUser> {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw createError(404, "User not found");
  }

  return toSafeUser(user);
}

export interface UpdateUserInput {
  name?: string;
  avatarUrl?: string;
  bio?: string;
}

export async function updateUser(
  userId: string,
  input: UpdateUserInput
): Promise<SafeUser> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: input.name,
      avatarUrl: input.avatarUrl,
      bio: input.bio
    }
  });

  logger.info("Updated user profile", { userId });

  return toSafeUser(user);
}
