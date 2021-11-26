import express, { Application } from 'express';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(express.json() as express.RequestHandler);

export default app;
