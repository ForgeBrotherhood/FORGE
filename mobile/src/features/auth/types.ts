// mobile/src/features/auth/types.ts

// Basic shape of a user record returned from the API.
// We can sync this later with packages/shared-types.
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Optional tokens returned from auth endpoints.
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

// Standard auth response: user + optional tokens.
export interface AuthResponse {
  user: User;
  tokens?: AuthTokens;
}

// Payload for login.
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload for sign up / registration.
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}
