// mobile/src/lib/env.ts

type AppEnvironment = "development" | "staging" | "production";

const env = (globalThis as any)?.process?.env ?? {};

const APP_ENV: AppEnvironment =
  (env.EXPO_PUBLIC_APP_ENV as AppEnvironment | undefined) ?? "development";

const API_BASE_URL: string =
  env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const BUILD_VERSION: string =
  env.EXPO_PUBLIC_BUILD_VERSION ?? "0.0.1";

export const ENV = {
  APP_ENV,
  API_BASE_URL,
  BUILD_VERSION,
  IS_DEV: APP_ENV === "development"
};

export type ForgeEnv = typeof ENV;

export function getApiBaseUrl(): string {
  return ENV.API_BASE_URL;
}
