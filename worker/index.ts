import './helpers/bootstrap';
import './services/transmission';

import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import worker from './worker';

const { NODE_ENV, JOB_INTERVAL } = process.env;

(async () => {
  // Start in-memory job scheduler
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob({ milliseconds: parseInt(JOB_INTERVAL, 10) }, worker)
  );

  console.log(`
✅ Worker started
⚙️  Environment: ${NODE_ENV}
🔥 Job interval: ${parseInt(JOB_INTERVAL, 10)}
`);
})();
