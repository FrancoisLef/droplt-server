declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    SERVER_PORT: string;
    JWT_SECRET: string;
    TRANSMISSION_URL: string;
    TRANSMISSION_USER: string;
    TRANSMISSION_PASSWORD: string;
  }
}
