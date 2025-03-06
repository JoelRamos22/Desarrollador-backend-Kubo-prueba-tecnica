import { PrismaClient } from '@prisma/client';
import { createClient } from '@libsql/client';
import { config } from './environment';

// Create Turso client
export const tursoClient = createClient({
  url: config.TURSO_DATABASE_URL,
  authToken: config.TURSO_AUTH_TOKEN
});

// Create Prisma client
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.TURSO_DATABASE_URL
    }
  }
});