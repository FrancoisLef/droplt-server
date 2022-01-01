import jwt from 'jsonwebtoken';
import { SuperAgentTest } from 'supertest';

import {
  getCookie,
  getUser,
  mockBcryptCompare,
  mockFindUniqueUser,
  useAgent,
} from './helpers';

let agent: SuperAgentTest;
const user = getUser();
const { email, password } = user;

describe('Auth - login', () => {
  beforeEach(() => {
    agent = useAgent();
  });

  it('should return a 400 on invalid credentials', async () => {
    return agent
      .post('/api/login')
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
    return agent.post('/api/login').expect(404).send({ email, password });
  });

  it('should return a 404 on wrong password', async () => {
    mockFindUniqueUser(user);
    return agent.post('/api/login').expect(404).send({ email, password });
  });

  it('should return a JWT on successful authentication', async () => {
    mockFindUniqueUser(user);
    mockBcryptCompare(true);

    return agent
      .post('/api/login')
      .expect(200)
      .expect(({ body }) => {
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

  it('should return a refresh_token as a cookie', async () => {
    mockFindUniqueUser(user);
    mockBcryptCompare(true);

    return agent
      .post('/api/login')
      .expect(200)
      .expect(({ headers }) => {
        const refreshToken = getCookie(
          'refresh_token',
          headers['set-cookie'][0]
        );
        expect(jwt.decode(refreshToken)).toEqual(
          expect.objectContaining({
            userId: user.userId,
          })
        );
      })
      .send({ email, password });
  });
});
