// mobile/src/features/subscriptions/api/subscriptionsApi.ts

export type SubscriptionPlan = "none" | "smith-monthly" | "smith-yearly";

export interface SubscriptionStatus {
  plan: SubscriptionPlan;
  isActive: boolean;
  isTrial?: boolean;
  renewsAt?: string | null;
  cancelAt?: string | null;
}

export interface CheckoutSessionResponse {
  url: string;
}

export interface BillingPortalResponse {
  url: string;
}

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

export async function fetchSubscriptionStatus(): Promise<SubscriptionStatus> {
  const data = await request<SubscriptionStatus>("/subscriptions/status");
  return {
    plan: data.plan ?? "none",
    isActive: !!data.isActive,
    isTrial: data.isTrial,
    renewsAt: data.renewsAt ?? null,
    cancelAt: data.cancelAt ?? null
  };
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  return request<CheckoutSessionResponse>("/subscriptions/checkout", {
    method: "POST"
  });
}

export async function createBillingPortalSession(): Promise<BillingPortalResponse> {
  return request<BillingPortalResponse>("/subscriptions/portal", {
    method: "POST"
  });
}
