// api/src/db/client.ts
//
// Prisma client singleton for the Forge API.

import { PrismaClient } from "@prisma/client";
import config from "../config/env";
import logger from "../config/logger";

const logConfig =
  config.isDev ? ["query", "info", "warn", "error"] : ["warn", "error"];

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: logConfig as any
  });
};

// Prevent multiple Prisma instances in dev (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? prismaClientSingleton();

if (config.isDev) {
  globalForPrisma.prisma = prisma;
}

prisma
  .$connect()
  .then(() => {
    logger.info("Connected to database", { url: "DATABASE_URL" });
  })
  .catch((err) => {
    logger.error("Failed to connect to database", { error: err });
  });

export default prisma;
