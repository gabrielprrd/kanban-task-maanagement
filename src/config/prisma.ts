import { PrismaClient } from '@prisma/client';
import { isServer } from '@/utils/index';

declare const global: Global & { dbClient?: PrismaClient };

export let dbClient: PrismaClient;

if (isServer) {
  if (process.env.NODE_ENV === 'production') {
    dbClient = new PrismaClient();
  } else {
    if (!global.dbClient) {
      global.dbClient = new PrismaClient();
    }
    dbClient = global.dbClient;
  }
}
