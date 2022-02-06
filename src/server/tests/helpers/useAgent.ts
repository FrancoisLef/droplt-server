import request, { SuperAgentTest } from 'supertest';

import app from '../../app';

const useAgent = (): SuperAgentTest => {
  return request.agent(app);
};

export default useAgent;
