// api/src/config/env.ts
//
// Centralized environment configuration for the Forge API.

export type NodeEnv = "development" | "test" | "production";

export interface AppConfig {
  nodeEnv: NodeEnv;
  isDev: boolean;
  isProd: boolean;
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  corsOrigin: string;
  openAiApiKey: string | null;
  stripeSecretKey: string | null;
  stripeWebhookSecret: string | null;
}

function getNodeEnv(): NodeEnv {
  const raw = process.env.NODE_ENV ?? "development";
  if (raw === "production" || raw === "test" || raw === "development") {
    return raw;
  }
  return "development";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Environment variable ${name} is required but was not set.`);
  }
  return value;
}

const nodeEnv = getNodeEnv();

const config: AppConfig = {
  nodeEnv,
  isDev: nodeEnv === "development",
  isProd: nodeEnv === "production",
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: requireEnv("DATABASE_URL"),
  jwtSecret: requireEnv("JWT_SECRET"),
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
  openAiApiKey: process.env.OPENAI_API_KEY ?? null,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? null,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? null
};

export default config;
