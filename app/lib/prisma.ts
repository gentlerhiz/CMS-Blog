import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Only initialize Prisma on the server side
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
  }
} else {
  // Create a dummy client for browser-side code (shouldn't be used)
  prisma = {} as PrismaClient;
}

export { prisma };