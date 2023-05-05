import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";

const globalForPrisma = globalThis as { prisma?: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
