import express, {
  Application,
  ErrorRequestHandler,
  json,
  RequestHandler,
} from 'express';
import helmet from 'helmet';
import { Unauthorized } from 'http-errors';

import admin from '../../services/firebase';
import { httpError } from './middlewares';

const app: Application = express();

// Setup various HTTP headers to secure app
app.use(helmet());

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Server public files
app.use(express.static('public'));

// Protect graphql endpoint with JWT authentication
app.use('/graphql', async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Unauthorized());
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token || token.length === 0) {
    return next(new Unauthorized());
  }

  try {
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
    return next();
  } catch (err) {
    return next(new Unauthorized());
  }
});

// Format HTTP errors
app.use(httpError() as ErrorRequestHandler);

export default app;
