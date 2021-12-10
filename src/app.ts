import express, {
  Application,
  ErrorRequestHandler,
  json,
  RequestHandler,
} from 'express';

import { httpError } from './middlewares';
import login from './routes/login';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Use login routes
app.use(login);

// Format HTTP errors
app.use(httpError() as ErrorRequestHandler);

export default app;
