import express, {
  Application,
  json,
  Request,
  RequestHandler,
  Response,
} from 'express';

import validate, { loginSchema } from './config/validations';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

app.post('/login', validate(loginSchema), (req: Request, res: Response) => {
  console.log(req.body.email);
  console.log(req.body.password);
  res.json({ success: true });
});

export default app;
