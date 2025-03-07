import { PrismaClient } from '@prisma/client';
import { config } from './environment';


// Create Prisma client
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL
    }
  }
});
