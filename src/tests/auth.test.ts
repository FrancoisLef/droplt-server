import bcrypt from 'bcrypt';
import request from 'supertest';

import app from '../app';
import { prismaMock } from '../setupTests';
import user from './fakes/user';

const { email, password } = user;

describe('Auth - login', () => {
  it('should respond to a POST request to /login URL', async () => {
    const post = await request(app).post('/login').send();
    expect(post.statusCode).not.toBe(404);
  });

  it('should return an error on invalid email', async () => {
    const result = await request(app).post('/login').send({ email: 'test' });
    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          param: 'email',
          location: 'body',
        }),
      ])
    );
  });

  it('should not return an error on valid email', async () => {
    const result = await request(app).post('/login').send({ email });
    expect(result.statusCode).toBe(400);
    expect(result.body.errors).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          param: 'email',
          location: 'body',
        }),
      ])
    );
  });

  it('should return an error on invalid password', async () => {
    const result = await request(app).post('/login').send({ email });
    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          param: 'password',
          location: 'body',
        }),
      ])
    );
  });

  it('should return a not found error on unknown user', async () => {
    const result = await request(app).post('/login').send({ email, password });
    expect(result.statusCode).toBe(404);
  });

  it('should return an unauthorized error on unknown user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const result = await request(app).post('/login').send({ email, password });
    console.log(result.body);
    expect(result.statusCode).toBe(200);
  });
});
