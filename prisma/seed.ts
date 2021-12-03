import 'reflect-metadata';

import { Prisma } from '@prisma/client';

import prisma from '../src/client';

const admin: Prisma.UserCreateInput = {
  email: 'test@test.fr',
  password: 'password',
  firstName: 'John',
  lastName: 'Doe',
};

async function main() {
  await prisma.user.upsert({
    where: {
      email: admin.email,
    },
    update: {},
    create: admin,
  });
  await prisma.user.updateMany({
    where: {
      email: admin.email,
    },
    data: {
      password: 'toto',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
