// mobile/src/features/auth/api/authApi.ts

import type { AuthResponse, LoginPayload, SignUpPayload } from "../types";

// In dev we’ll read from EXPO_PUBLIC_API_BASE_URL if available,
// otherwise fall back to localhost. You’ll point this to your Render
// API later.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();

  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function signUpApi(payload: SignUpPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function requestPasswordResetApi(
  email: string
): Promise<void> {
  await request<unknown>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  });
}
