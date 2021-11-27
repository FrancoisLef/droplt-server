import express, { Application } from 'express';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(express.json() as express.RequestHandler);

app.get('/', (req, res) => {
  res.send('Coucou');
});

export default app;
