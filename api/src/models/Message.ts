// api/src/models/Message.ts

import { Message as PrismaMessage } from "@prisma/client";

/**
 * Chat message model (Brotherhood group messages, etc.).
 */
export type Message = PrismaMessage;
