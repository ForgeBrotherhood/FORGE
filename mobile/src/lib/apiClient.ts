// mobile/src/lib/apiClient.ts

import { ENV, getApiBaseUrl } from "./env";
import { logError } from "./logger";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  token?: string | null;
  signal?: AbortSignal;
}

export interface ApiErrorInfo {
  status?: number;
  data?: unknown;
}

export class ApiError extends Error implements ApiErrorInfo {
  status?: number;
  data?: unknown;

  constructor(message: string, info?: ApiErrorInfo) {
    super(message);
    this.name = "ApiError";
    this.status = info?.status;
    this.data = info?.data;
  }
}

export async function apiRequest<TResponse = unknown, TBody = unknown>(
  path: string,
  options: ApiClientOptions & { body?: TBody } = {}
): Promise<TResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers ?? {})
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const method: HttpMethod =
    options.method ?? (options.body ? "POST" : "GET");

  const fetchOptions: RequestInit = {
    method,
    headers,
    signal: options.signal
  };

  if (options.body !== undefined) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const res = await fetch(url, fetchOptions);
    const text = await res.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) ||
        `Request failed with status ${res.status}`;

      throw new ApiError(message, {
        status: res.status,
        data
      });
    }

    return data as TResponse;
  } catch (err) {
    logError("API", "Request failed", {
      path,
      method,
      env: ENV.APP_ENV,
      error: err instanceof Error ? err.message : String(err)
    });
    throw err;
  }
}

export function apiGet<TResponse>(
  path: string,
  options?: ApiClientOptions
) {
  return apiRequest<TResponse>(path, {
    ...options,
    method: "GET"
  });
}

export function apiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options?: ApiClientOptions
) {
  return apiRequest<TResponse, TBody>(path, {
    ...options,
    method: "POST",
    body
  });
}

export function apiPatch<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options?: ApiClientOptions
) {
  return apiRequest<TResponse, TBody>(path, {
    ...options,
    method: "PATCH",
    body
  });
}

export function apiDelete<TResponse>(
  path: string,
  options?: ApiClientOptions
) {
  return apiRequest<TResponse>(path, {
    ...options,
    method: "DELETE"
  });
}
