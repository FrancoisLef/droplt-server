declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_URL: string;
      APP_NAME: string;
      SERVER_PORT: string;
      JOB_INTERVAL: string;
      JWT_SECRET: string;
      COOKIE_SECRET: string;
      TRANSMISSION_URL: string;
      TRANSMISSION_USER: string;
      TRANSMISSION_PASSWORD: string;
    }
  }
}

export {};
