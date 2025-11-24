// packages/shared-types/src/auth.ts

export type UserId = string;

export interface AuthUser {
  id: UserId;
  email: string;
  name: string;
  avatarUrl?: string | null;
  isPremium: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
