import './helpers/bootstrap';
import './services/transmission';

import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import cleaner from './cleaner';
import redis from './services/redis';
import worker from './worker';

const { NODE_ENV, JOB_CLEAN_INTERVAL, JOB_FEED_INTERVAL } = process.env;

(async () => {
  // Feeder job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { milliseconds: parseInt(JOB_FEED_INTERVAL, 10), runImmediately: true },
      worker
    )
  );

  // Cleaner job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { milliseconds: parseInt(JOB_CLEAN_INTERVAL, 10), runImmediately: true },
      cleaner
    )
  );

  redis.on('connect', () => console.log('🔄 connected to Redis'));
  redis.on('close', () => console.log('🚫 connection to Redis closed'));
  redis.on('reconnecting', () => console.log('😬 reconnecting to Redis'));

  console.log(`✅ Worker started
⚙️  Environment: ${NODE_ENV}
🔥 Feed interval: ${parseInt(JOB_FEED_INTERVAL, 10)}
🗑  Clean interval: ${parseInt(JOB_CLEAN_INTERVAL, 10)}`);
})();
