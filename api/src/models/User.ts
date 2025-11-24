// api/src/models/User.ts

import { User as PrismaUser } from "@prisma/client";

/**
 * Raw Prisma user model.
 * Use this when working directly with the database.
 */
export type User = PrismaUser;

/**
 * Public-safe user shape (no passwordHash).
 */
export type PublicUser = Omit<PrismaUser, "passwordHash">;

/**
 * Helper to strip sensitive fields from a User before sending
 * over the wire.
 */
export function toPublicUser(
  user: PrismaUser | null | undefined
): PublicUser | null {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}
