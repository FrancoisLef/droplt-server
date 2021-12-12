declare namespace NodeJS {
  interface ProcessEnv {
    APP_NAME: string;
    SERVER_PORT: string;
    JWT_SECRET: string;
    COOKIE_SECRET: string;
    TRANSMISSION_URL: string;
    TRANSMISSION_USER: string;
    TRANSMISSION_PASSWORD: string;
  }
}