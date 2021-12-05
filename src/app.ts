import express, { Application } from 'express';
import { body, validationResult } from 'express-validator';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(express.json() as express.RequestHandler);

app.post(
  '/login',
  body('email').isEmail(),
  body('password').isString(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Coucou');
  }
);

export default app;
