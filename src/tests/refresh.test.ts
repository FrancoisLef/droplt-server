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

describe('Auth - refresh', () => {
  beforeEach(() => {
    agent = useAgent();
  });

  it('should return a 401 on missing refresh_token cookie', async () => {
    return agent.get('/refresh').expect(401);
  });

  it('should return a 401 on invalid refresh_token cookie', async () => {
    return agent
      .get('/refresh')
      .set('Cookie', 'refresh_token=test')
      .expect(401);
  });

  // it('should return a 404 on unknown email', async () => {
  //   return agent.post('/login').expect(404).send({ email, password });
  // });

  // it('should return a 404 on wrong password', async () => {
  //   mockFindUniqueUser(user);
  //   return agent.post('/login').expect(404).send({ email, password });
  // });

  // it('should return a JWT on successful authentication', async () => {
  //   mockFindUniqueUser(user);
  //   mockBcryptCompare(true);

  //   return agent
  //     .post('/login')
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(jwt.decode(body.token)).toEqual(
  //         expect.objectContaining({
  //           userId: user.userId,
  //           firstName: user.firstName,
  //           lastName: user.lastName,
  //         })
  //       );
  //     })
  //     .send({ email, password });
  // });

  // it('should return a refresh_token as a cookie', async () => {
  //   mockFindUniqueUser(user);
  //   mockBcryptCompare(true);

  //   return agent
  //     .post('/login')
  //     .expect(200)
  //     .expect(({ headers }) => {
  //       const refreshToken = getCookie(
  //         'refresh_token',
  //         headers['set-cookie'][0]
  //       );
  //       expect(jwt.decode(refreshToken)).toEqual(
  //         expect.objectContaining({
  //           userId: user.userId,
  //           firstName: user.firstName,
  //           lastName: user.lastName,
  //         })
  //       );
  //     })
  //     .send({ email, password });
  // });
});
