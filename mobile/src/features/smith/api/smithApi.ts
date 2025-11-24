// mobile/src/features/smith/api/smithApi.ts

import type { SmithMode } from "../types";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface SmithApiResponse {
  reply: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
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

/**
 * Sends a message from the user to The Smith.
 * Backend should respond with { reply: string }.
 * Adjust the path "/smith/chat" to match your API later.
 */
export async function sendSmithMessage(
  message: string,
  mode: SmithMode = "default"
): Promise<SmithApiResponse> {
  return request<SmithApiResponse>("/smith/chat", {
    method: "POST",
    body: JSON.stringify({
      message,
      mode
    })
  });
}
