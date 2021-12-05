import { PrismaClient } from '@prisma/client';

import hashUserPassword from './hashUserPassword';

const prisma: PrismaClient = new PrismaClient();

prisma.$use(hashUserPassword);

export default prisma;
