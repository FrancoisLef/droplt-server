import user from './fakes/user';
import { usePrisma } from './helpers';

const { prisma, prismaMock } = usePrisma();

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
