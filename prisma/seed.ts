import 'reflect-metadata';

// import { Prisma } from '@prisma/client';
// import Chance from 'chance';
import prisma from '../src/prisma';

// const admin: Prisma.UserCreateInput = {
//   email: 'test@test.fr',
//   password: 'password',
//   firstName: 'John',
//   lastName: 'Doe',
// };

async function main() {
  // await prisma.user.upsert({
  //   where: {
  //     email: admin.email,
  //   },
  //   update: {},
  //   create: admin,
  // });
  // if (process.env.NODE_ENV === 'development') {
  //   await Promise.all(
  //     Array(5)
  //       .fill(0)
  //       .map(async (_, i) => {
  //         const faker = new Chance(i);
  //         const email = `test${i}@test.fr`;
  //         const user: Prisma.UserCreateInput = {
  //           email,
  //           password: 'password',
  //           firstName: faker.name(),
  //           lastName: faker.name(),
  //         };
  //         return prisma.user.upsert({
  //           where: {
  //             email: user.email,
  //           },
  //           update: {},
  //           create: user,
  //         });
  //       })
  //   );
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
