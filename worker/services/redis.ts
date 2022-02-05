import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

export const channel = {
  create: process.env.PUBSUB_CHANNEL_CREATE,
  update: process.env.PUBSUB_CHANNEL_UPDATE,
  delete: process.env.PUBSUB_CHANNEL_DELETE,
};

export default redis;
