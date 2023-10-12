import { PrismaClient } from "@prisma/client";

import { env } from "@/lib/env";

export { Prisma as PrismaTypes } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prismaClient = global.prismaClient || new PrismaClient();

if (env.NODE_ENV === "development") {
  global.prismaClient = prismaClient;
}
