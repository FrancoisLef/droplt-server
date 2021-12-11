import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../app';
import { prismaMock } from '../setupTests';
import user from './fakes/user';

const { email, password } = user;

describe('Auth - login', () => {
  it('should be served on endpoint /login', async () => {
    const post = await request(app).post('/login').send();
    expect(post.statusCode).not.toBe(404);
  });

  it('should return a 400 on invalid credentials', async () => {
    const result = await request(app).post('/login').send({});
    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toEqual(
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
  });

  it('should return a 404 on unknown email', async () => {
    const result = await request(app).post('/login').send({ email, password });
    expect(result.statusCode).toBe(404);
  });

  it('should return a 404 on wrong password', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const result = await request(app).post('/login').send({ email, password });
    expect(result.statusCode).toBe(404);
  });

  it('should return a JWT on successful authentication', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const result = await request(app).post('/login').send({ email, password });
    console.log(result.body);
    expect(result.statusCode).toBe(200);
  });
});
