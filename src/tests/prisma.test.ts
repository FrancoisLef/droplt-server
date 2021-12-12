import prisma from '../prisma';
import { prismaMock } from '../setupTests';
import user from './fakes/user';

describe('Prisma mocks', () => {
  it('should be able to mock prisma resolved values', async () => {
    prismaMock.user.create.mockResolvedValue(user);
    await expect(
      prisma.user.create({
        data: user,
      })
    ).resolves.toMatchObject(user);
  });
});
