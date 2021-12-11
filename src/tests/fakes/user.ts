import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const user: User = {
  userId: uuid(),
  email: 'john@doe.fr',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password',
  isDisabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default user;
