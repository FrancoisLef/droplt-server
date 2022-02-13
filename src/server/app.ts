import express, { Application, json, RequestHandler } from 'express';
import helmet from 'helmet';

const app: Application = express();

// Setup various HTTP headers to secure app
app.use(helmet());

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Server public files
app.use(express.static('public'));

export default app;
