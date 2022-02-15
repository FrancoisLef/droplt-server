import { PrismaClient } from '@prisma/client';

import prisma from './services/prisma';

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
