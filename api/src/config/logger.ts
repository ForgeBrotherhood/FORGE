// api/src/config/logger.ts
//
// Lightweight structured logger wrapping console.*
// Usage: logger.info("User signed up", { userId });

import config from "./env";

type LogLevelName = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevelName, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

const envLogLevel =
  (process.env.LOG_LEVEL as LogLevelName | undefined) ??
  (config.isDev ? "debug" : "info");

function shouldLog(level: LogLevelName): boolean {
  return LEVELS[level] >= LEVELS[envLogLevel];
}

interface LogMeta {
  [key: string]: unknown;
}

function log(level: LogLevelName, message: string, meta?: LogMeta) {
  if (!shouldLog(level)) return;

  const payload = {
    level,
    message,
    ...meta,
    ts: new Date().toISOString(),
    env: config.nodeEnv
  };

  switch (level) {
    case "debug":
      // eslint-disable-next-line no-console
      console.debug("[FORGE]", payload);
      break;
    case "info":
      // eslint-disable-next-line no-console
      console.info("[FORGE]", payload);
      break;
    case "warn":
      // eslint-disable-next-line no-console
      console.warn("[FORGE]", payload);
      break;
    case "error":
      // eslint-disable-next-line no-console
      console.error("[FORGE]", payload);
      break;
  }
}

export const logger = {
  debug: (msg: string, meta?: LogMeta) => log("debug", msg, meta),
  info: (msg: string, meta?: LogMeta) => log("info", msg, meta),
  warn: (msg: string, meta?: LogMeta) => log("warn", msg, meta),
  error: (msg: string, meta?: LogMeta) => log("error", msg, meta)
};

export default logger;
