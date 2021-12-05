import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const hashPassword = async (user: User): Promise<void> => {
  if (!user || !user.password) {
    return;
  }

  user.password = await bcrypt.hash(user.password, 10);
};

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

export default hashPasswordMiddleware;
