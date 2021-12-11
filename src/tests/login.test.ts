import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../app';
import { prismaMock } from '../setupTests';
import user from './fakes/user';

const agent = request.agent(app);
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
    prismaMock.user.findUnique.mockResolvedValue(user);
    return agent.post('/login').expect(404).send({ email, password });
  });

  it('should return a JWT on successful authentication', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    return agent
      .post('/login')
      .expect(200)
      .expect(({ body, headers }) => {
        console.log(body);
        console.log(headers);
      })
      .send({ email, password });
  });
});
