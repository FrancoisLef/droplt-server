declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APP_NAME: string;
      SERVER_PORT: string;
      JOB_FEED_INTERVAL: string;
      JOB_CLEAN_INTERVAL: string;
      PUBSUB_CHANNEL_CREATE: string;
      PUBSUB_CHANNEL_UPDATE: string;
      PUBSUB_CHANNEL_DELETE: string;
      JWT_SECRET: string;
      COOKIE_SECRET: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      REDIS_PORT: string;
      REDIS_HOST: string;
      TRANSMISSION_URL: string;
      TRANSMISSION_USER: string;
      TRANSMISSION_PASSWORD: string;
    }
  }
}

export {}
