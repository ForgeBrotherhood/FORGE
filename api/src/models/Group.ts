// api/src/models/Group.ts

import { Group as PrismaGroup } from "@prisma/client";

/**
 * Brotherhood group (room) model.
 * Currently just an alias to Prisma's Group.
 */
export type Group = PrismaGroup;
