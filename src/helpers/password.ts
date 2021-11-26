import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const hashUserPassword = async (user: User): Promise<User> => {
  user.password = await hashPassword(user.password);
  return user;
};

export const isValidPassword = async (
  user: User,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, user.password);
};
