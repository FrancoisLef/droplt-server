declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      APP_NAME: string;
      SERVER_PORT: string;
      JOB_INTERVAL: string;
      JWT_SECRET: string;
      COOKIE_SECRET: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_URL: string;
      TRANSMISSION_URL: string;
      TRANSMISSION_USER: string;
      TRANSMISSION_PASSWORD: string;
    }
  }
}

export {};
