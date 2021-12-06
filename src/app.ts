import express, {
  Application,
  json,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { check } from 'express-validator';

import { validate } from './modules/express';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

app.post(
  '/login',
  validate([
    check('email').isEmail().normalizeEmail(),
    check('password').notEmpty().isString(),
  ]),
  (req: Request, res: Response) => {
    res.send('Coucou');
  }
);

export default app;
