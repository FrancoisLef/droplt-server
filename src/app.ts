import express, { Application } from 'express';
import passport from 'passport';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(express.json() as express.RequestHandler);

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Coucou');
});

export default app;
