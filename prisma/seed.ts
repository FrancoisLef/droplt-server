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
  console.log('⏱ Start seeding ...');
  await prisma.user.upsert({
    where: {
      email: admin.email,
    },
    update: {},
    create: admin,
  });
  console.log('🌱 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
