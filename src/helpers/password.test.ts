import user from '../tests/fakes/user';
import { hashPassword, hashUserPassword } from './password';

describe('Helpers - password', () => {
  describe('hashPassword', () => {
    it('should return an hashed string', async () => {
      const output = await hashPassword(user.password);
      expect(output).toEqual(expect.any(String));
      expect(output).not.toEqual(user.password);
    });
  });

  describe('hashUserPassword', () => {
    it('should update user object reference with an ashed password', async () => {
      const oldPassword = user.password;
      const output = await hashUserPassword(user);
      expect(output).toStrictEqual(user);
      expect(oldPassword).not.toEqual(user.password);
    });
  });
});
