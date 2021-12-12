import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import usePrisma from './usePrisma';

const { prismaMock } = usePrisma();

export const getUser = (data?: Partial<User>): User => ({
  userId: uuid(),
  email: 'john@doe.fr',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password',
  isDisabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...data,
});

export const mockFindUniqueUser = (value: User) => {
  prismaMock.user.findUnique.mockResolvedValue(value);
};

export const mockCreateUser = (value: User) => {
  prismaMock.user.create.mockResolvedValue(value);
};
