import { User } from '@prisma/client';

const user: User = {
  userId: '1',
  email: 'john@doe.fr',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password',
  isDisabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default user;
