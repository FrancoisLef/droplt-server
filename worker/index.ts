import './helpers/bootstrap';
import './services/transmission';

import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import redis from './services/redis';
import worker from './worker';

const { NODE_ENV, JOB_INTERVAL } = process.env;

(async () => {
  // Start in-memory job scheduler
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob({ milliseconds: parseInt(JOB_INTERVAL, 10) }, worker)
  );

  redis.on('connect', () => console.log('🔄 connected to Redis'));
  redis.on('close', () => console.log('🚫 connection to Redis closed'));
  redis.on('reconnecting', () => console.log('😬 reconnecting to Redis'));

  console.log(`✅ Worker started
⚙️  Environment: ${NODE_ENV}
🔥 Job interval: ${parseInt(JOB_INTERVAL, 10)}`);
})();
