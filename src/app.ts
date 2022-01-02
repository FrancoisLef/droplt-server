import cookieParser from 'cookie-parser';
import express, {
  Application,
  ErrorRequestHandler,
  json,
  RequestHandler,
} from 'express';

import { httpError } from './middlewares';
import refresh from './routes/refresh';
import signin from './routes/signin';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Parse cookies from requests
// Encode signed cookies from responses
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes definition
app.use(signin);
app.use(refresh);

// Format HTTP errors
app.use(httpError() as ErrorRequestHandler);

export default app;
