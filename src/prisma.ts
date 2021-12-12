import { Prisma, PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const hashPassword = async (user: User): Promise<void> => {
  if (!user || !user.password) {
    return;
  }
  user.password = await bcrypt.hash(user.password, 10);
};

/**
 * Password hashing middleware
 * Hash user password on create/update/upsert operations
 */
const hashPasswordMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model !== 'User') {
    return next(params);
  }

  if (['create', 'update', 'updateMany'].includes(params.action)) {
    await hashPassword(params.args.data);
  }

  if (params.action === 'upsert') {
    await hashPassword(params.args.create);
    await hashPassword(params.args.update);
  }

  return next(params);
};

const prisma: PrismaClient = new PrismaClient();

prisma.$use(hashPasswordMiddleware);

export default prisma;
