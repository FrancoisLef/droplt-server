import { PrismaClient } from '@prisma/client';

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = 5432,
} = process.env;

const prisma: PrismaClient = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
    },
  },
});

export default prisma;
