import prisma from '../../prisma';
import { prismaMock } from '../../setupTests';

const usePrisma = () => {
  return {
    prisma,
    prismaMock,
  };
};

export default usePrisma;
