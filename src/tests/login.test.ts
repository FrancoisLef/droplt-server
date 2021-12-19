import jwt from 'jsonwebtoken';

import {
  getUser,
  mockBcryptCompare,
  mockFindUniqueUser,
  useAgent,
} from './helpers';

const agent = useAgent();
const user = getUser();
const { email, password } = user;

describe('Auth - login', () => {
  it('should return a 400 on invalid credentials', async () => {
    return agent
      .post('/login')
      .expect(400)
      .expect(({ body }) => {
        expect(body.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              param: 'email',
              location: 'body',
            }),
            expect.objectContaining({
              param: 'password',
              location: 'body',
            }),
          ])
        );
      })
      .send({});
  });

  it('should return a 404 on unknown email', async () => {
    return agent.post('/login').expect(404).send({ email, password });
  });

  it('should return a 404 on wrong password', async () => {
    mockFindUniqueUser(user);
    return agent.post('/login').expect(404).send({ email, password });
  });

  it('should return a JWT on successful authentication', async () => {
    mockFindUniqueUser(user);
    mockBcryptCompare(true);

    return agent
      .post('/login')
      .expect(200)
      .expect(({ body, headers }) => {
        expect(jwt.decode(body.token)).toEqual(
          expect.objectContaining({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
          })
        );
      })
      .send({ email, password });
  });
});
