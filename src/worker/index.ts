import dotenv from 'dotenv-flow';

dotenv.config({
  silent: true,
});

import '../services/transmission';

import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import redis from '../services/redis';
import cleaner from './jobs/cleaner';
import worker from './jobs/worker';

const { NODE_ENV, TRANSMISSION_URL, JOB_CLEAN_INTERVAL, JOB_FEED_INTERVAL } =
  process.env;

(async () => {
  // Feeder job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { seconds: parseInt(JOB_FEED_INTERVAL, 10), runImmediately: true },
      worker
    )
  );

  // Cleaner job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { seconds: parseInt(JOB_CLEAN_INTERVAL, 10), runImmediately: true },
      cleaner
    )
  );

  redis.on('connect', () => console.log('🗂  Redis ready'));
  redis.on('close', () => console.log('🚫 connection to Redis closed'));
  redis.on('reconnecting', () => console.log('🗂  Redis is reconnecting'));

  console.log(`✅ Worker started
⚙️  Environment: ${NODE_ENV}
🔥 Feed interval: ${parseInt(JOB_FEED_INTERVAL, 10)} seconds
🗑  Clean interval: ${parseInt(JOB_CLEAN_INTERVAL, 10)} seconds
💧 Transmission url ${TRANSMISSION_URL}`);
})();
