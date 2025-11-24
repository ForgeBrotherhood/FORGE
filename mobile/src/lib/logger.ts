// mobile/src/lib/logger.ts

import { ENV } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMeta {
  [key: string]: unknown;
}

function log(level: LogLevel, tag: string, message: string, meta?: LogMeta) {
  if (!ENV.IS_DEV && level === "debug") return;

  const payload = meta ? { tag, message, ...meta } : { tag, message };

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

export function logDebug(tag: string, message: string, meta?: LogMeta) {
  log("debug", tag, message, meta);
}

export function logInfo(tag: string, message: string, meta?: LogMeta) {
  log("info", tag, message, meta);
}

export function logWarn(tag: string, message: string, meta?: LogMeta) {
  log("warn", tag, message, meta);
}

export function logError(tag: string, message: string, meta?: LogMeta) {
  log("error", tag, message, meta);
}
