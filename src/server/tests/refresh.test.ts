import { SuperAgentTest } from 'supertest';

import { useAgent } from './helpers';

let agent: SuperAgentTest;
const URL = '/api/refresh';

describe('Auth - refresh', () => {
  beforeEach(() => {
    agent = useAgent();
  });

  it('should return a 401 on missing refresh_token cookie', async () => {
    return agent.get(URL).expect(401);
  });

  it('should return a 401 on invalid refresh_token', async () => {
    return agent.get(URL).set('Cookie', 'refresh_token=test').expect(401);
  });
});
