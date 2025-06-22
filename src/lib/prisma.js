import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:./dev.db'
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 