import prisma from '../client';
import { prismaMock } from '../setupTests';

describe('Prisma mocks', () => {
  it('should be able to mock prisma resolved values', async () => {
    const user = {
      userId: '1',
      email: 'test@test.fr',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      isDisabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await prismaMock.user.create.mockResolvedValue(user);
    await expect(
      prisma.user.create({
        data: user,
      })
    ).resolves.toMatchObject({
      userId: '1',
      email: 'test@test.fr',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      isDisabled: false,
    });
  });
});
