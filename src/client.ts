import { Prisma, PrismaClient } from '@prisma/client';

import { hashUserPassword } from './helpers/password';

const prisma: PrismaClient = new PrismaClient();

prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
  if (params.model === 'User') {
    if (params.action === 'create') {
      await hashUserPassword(params.args.data);
    }
    if (params.action === 'upsert') {
      await hashUserPassword(params.args.create);
    }
  }

  return await next(params);
});

export default prisma;
