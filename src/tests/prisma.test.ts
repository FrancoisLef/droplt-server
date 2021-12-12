import { getUser, mockCreateUser, usePrisma } from './helpers';

const { prisma } = usePrisma();
const user = getUser();

describe('Prisma mocks', () => {
  it('should be able to mock prisma resolved values', async () => {
    mockCreateUser(user);
    await expect(
      prisma.user.create({
        data: user,
      })
    ).resolves.toMatchObject(user);
  });
});
