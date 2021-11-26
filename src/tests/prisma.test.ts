import prisma from '../client';
import { prismaMock } from '../setupTests';
import user from './fakes/user';

describe('Prisma mocks', () => {
  it('should be able to mock prisma resolved values', async () => {
    await prismaMock.user.create.mockResolvedValue(user);
    await expect(
      prisma.user.create({
        data: user,
      })
    ).resolves.toMatchObject(user);
  });
});
