import cookieParser from 'cookie-parser';
import express, {
  Application,
  ErrorRequestHandler,
  json,
  RequestHandler,
} from 'express';
import jwt from 'express-jwt';
import helmet from 'helmet';

import { algorithm, jwtOptions } from './helpers/auth';
import { authError, httpError } from './middlewares';
import refresh from './routes/refresh';
import signin from './routes/signin';
import signout from './routes/signout';

const { JWT_SECRET } = process.env;
const app: Application = express();

// Setup various HTTP headers to secure app
app.use(helmet());

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Parse cookies from requests
// Encode signed cookies from responses
app.use(cookieParser(process.env.COOKIE_SECRET));

// Protect graphql endpoint with JWT authentication
app.use(
  '/graphql',
  jwt({
    algorithms: [algorithm],
    secret: JWT_SECRET,
    ...jwtOptions,
  })
);

// Routes definition
app.use(signin);
app.use(signout);
app.use(refresh);

// Handle authentication errors
app.use(authError() as ErrorRequestHandler);

// Format HTTP errors
app.use(httpError() as ErrorRequestHandler);

export default app;
