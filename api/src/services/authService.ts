// api/src/services/authService.ts
//
// Auth domain logic: register, login, token refresh.
// NOTE: Requires bcryptjs and a JWT helper in ../lib/jwt.

import bcrypt from "bcryptjs";
import prisma from "../db/client";
import logger from "../config/logger";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
} from "../lib/jwt";
import { SafeUser, toSafeUser } from "./userService";

function createError(status: number, message: string) {
  return Object.assign(new Error(message), { status });
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends AuthTokens {
  user: SafeUser;
}

export async function register(input: RegisterInput): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!email || !password) {
    throw createError(400, "Email and password are required");
  }

  if (password.length < 8) {
    throw createError(400, "Password must be at least 8 characters long");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw createError(409, "Email is already in use");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: input.name
    }
  });

  logger.info("User registered", { userId: user.id, email: user.email });

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id });

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken
  };
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw createError(401, "Invalid email or password");
  }

  logger.info("User logged in", { userId: user.id, email: user.email });

  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id });

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken
  };
}

export async function refreshTokens(
  refreshToken: string
): Promise<AuthResult> {
  let payload: { userId: string };

  try {
    payload = verifyRefreshToken(refreshToken) as { userId: string };
  } catch {
    throw createError(401, "Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId }
  });

  if (!user) {
    throw createError(401, "User not found");
  }

  const accessToken = createAccessToken({ userId: user.id });
  const newRefreshToken = createRefreshToken({ userId: user.id });

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken: newRefreshToken
  };
}

// Placeholders: implement proper email/token-based flow later.
export async function requestPasswordReset(email: string): Promise<void> {
  logger.warn("Password reset not implemented", { email });
  throw createError(501, "Password reset not implemented yet");
}

export async function resetPassword(
  _token: string,
  _newPassword: string
): Promise<void> {
  logger.warn("Password reset not implemented");
  throw createError(501, "Password reset not implemented yet");
}
