// mobile/src/features/brotherhood/api/brotherhoodApi.ts

import type { Group, GroupMessage } from "../types";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

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

// Fetch main Brotherhood rooms (Business, Fitness, Faith, etc.).
// TODO: Align this path with the actual backend when we implement it.
export async function fetchDefaultGroups(): Promise<Group[]> {
  return request<Group[]>("/brotherhood/groups?default=true");
}

// Fetch all messages for a given group.
export async function fetchGroupMessages(
  groupId: string
): Promise<GroupMessage[]> {
  return request<GroupMessage[]>(`/brotherhood/groups/${groupId}/messages`);
}

// Post a new message into a group.
export async function postGroupMessage(
  groupId: string,
  body: string
): Promise<GroupMessage> {
  return request<GroupMessage>(`/brotherhood/groups/${groupId}/messages`, {
    method: "POST",
    body: JSON.stringify({ body })
  });
}
