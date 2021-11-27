import request from 'supertest';

import app from '../app';

describe('Authentication', () => {
  it('should be ok', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toBe(200);
    expect(result.text).toEqual('Coucou');
  });
});
