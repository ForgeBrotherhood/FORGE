// api/src/lib/jwt.ts

import jwt, { JwtPayload as BaseJwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends BaseJwtPayload {
  userId: string;
}

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || '';
const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || '';

const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

function ensureSecret(secret: string, label: string) {
  if (!secret) {
    throw new Error(`${label} is not configured`);
  }
}

export function createAccessToken(payload: { userId: string }): string {
  ensureSecret(ACCESS_SECRET, 'JWT_ACCESS_SECRET / JWT_SECRET');
  return jwt.sign({ userId: payload.userId }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
}

export function createRefreshToken(payload: { userId: string }): string {
  ensureSecret(REFRESH_SECRET, 'JWT_REFRESH_SECRET / JWT_SECRET');
  return jwt.sign({ userId: payload.userId }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

function verifyToken(
  token: string,
  secret: string,
  kind: 'access' | 'refresh'
): TokenPayload {
  ensureSecret(secret, kind === 'access' ? 'JWT_ACCESS_SECRET / JWT_SECRET' : 'JWT_REFRESH_SECRET / JWT_SECRET');

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;

    if (!decoded || !decoded.userId) {
      const err: any = new Error(`Invalid ${kind} token payload`);
      err.status = 401;
      throw err;
    }

    return decoded;
  } catch (err) {
    const error: any = new Error(
      `Invalid or expired ${kind} token`
    );
    error.status = 401;
    throw error;
  }
}

export function verifyAccessToken(token: string): TokenPayload {
  return verifyToken(token, ACCESS_SECRET, 'access');
}

export function verifyRefreshToken(token: string): TokenPayload {
  return verifyToken(token, REFRESH_SECRET, 'refresh');
}
