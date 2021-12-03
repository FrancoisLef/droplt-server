import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const hashPasswordMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model !== 'User') {
    return next(params);
  }

  const user = params.args;

  console.log(`
---- USER ----
${JSON.stringify(user, null, 2)}
`);

  // user.create.password = 'toto';
  // if (params.action === 'create') {
  //   params.args.data.password = await hashPassword(params.args.data.password);
  //   // params.args.data = await hashPassword(params.args.data);
  // }
  // if (params.action === 'upsert') {
  //   params.args.update.password = await hashPassword(params.args.update.password);
  //   // await hashPassword(params.args.create);
  // }
  // // if (params.action === 'create' || params.action === 'upsert') {
  // //   await hashPassword(params.args.data || params.args.create);
  // //   // await hashUserPassword(params.args.data);
  // // }

  params.args = user;

  console.log(`
---- MIDDLEWARE END ----
${JSON.stringify(params, null, 2)}
`);

  return next(params);
};

export default hashPasswordMiddleware;
