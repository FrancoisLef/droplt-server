import request from 'supertest';

import app from '../app';

describe('Authentication', () => {
  it('should return a 401 http status code', async () => {
    const result = await request(app).post('/login').send({
      email: 'test.fr',
      password: 'coucou',
    });
    console.log(JSON.stringify(result.body, null, 2));
    expect(result.statusCode).toBe(401);
  });
});
