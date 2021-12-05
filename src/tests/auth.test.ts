import request from 'supertest';

import app from '../app';

describe('Authentication', () => {
  it('should return a 401 http status code', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toBe(401);
  });
});
