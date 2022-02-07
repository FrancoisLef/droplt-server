import Redis from 'ioredis';

const {
  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  PUBSUB_CHANNEL_CREATE,
  PUBSUB_CHANNEL_UPDATE,
  PUBSUB_CHANNEL_DELETE,
} = process.env;

const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
});

export const channel = {
  create: PUBSUB_CHANNEL_CREATE,
  update: PUBSUB_CHANNEL_UPDATE,
  delete: PUBSUB_CHANNEL_DELETE,
};

export default redis;
