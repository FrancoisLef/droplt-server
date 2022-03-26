import 'reflect-metadata';

import dotenv from 'dotenv-flow';

dotenv.config({
  silent: true,
});

import {
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, json, RequestHandler } from 'express';
import { execute, subscribe } from 'graphql';
import helmet from 'helmet';
import http from 'http';
import multer from 'multer';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import { buildSchema } from 'type-graphql';

import { DashboardResolver, TorrentResolver } from './graphql';
import cleaner from './jobs/cleaner';
import feeder from './jobs/feeder';
import admin from './services/firebase';
import prisma from './services/prisma';
import { Context } from './types';

const {
  SERVER_PORT = 4000,
  NODE_ENV,
  JOB_CLEAN_INTERVAL,
  JOB_FEED_INTERVAL,
} = process.env;

const cleanJobInterval = parseInt(JOB_CLEAN_INTERVAL, 10) || 60;
const feedJobInterval = parseInt(JOB_FEED_INTERVAL, 10) || 5;

const upload = multer({
  dest: 'tmp/uploads/',
  fileFilter: (req, file, next) => {
    if (file.mimetype !== 'application/octet-stream') {
      return next(null, false);
    }

    if (!file.originalname.endsWith('.torrent')) {
      return next(null, false);
    }

    next(null, true);
  },
});

// Init Express app
const app: Application = express();

// Setup various HTTP headers to secure app
app.use(helmet());

// Parse incoming requests with JSON payloads
app.use(json() as RequestHandler);

// Server public files
app.use(express.static('public'));

// Upload .torrent files
app.post('/upload', upload.array('torrents'), (req, res) => {
  res.json({
    files: req.files,
  });
});

(async () => {
  // Encapsulate Express App into a HTTP server
  // So that we can re-use the HTTP server instance to listen for WebSocket
  // Useful for GraphQL subscriptions
  const httpServer = http.createServer(app);

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [DashboardResolver, TorrentResolver],
    emitSchemaFile: 'public/schema.graphql',
  });

  // ApolloServer configuration
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => {
      if (!req.headers.authorization) {
        throw new AuthenticationError('');
      }

      try {
        const user = await admin
          .auth()
          .verifyIdToken(req.headers.authorization.split(' ')[1]);
        return {
          req,
          user,
          prisma,
        };
      } catch (err) {
        throw new AuthenticationError('');
      }
    },
    plugins: [
      // Handles server stop
      // - stop listening for new connections
      // - close idle connections
      // - close active connections whenever they become idle
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  // Start Apollo server (must be done before applying it)
  await apolloServer.start();

  // Attach Apollo server to Express App
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start HTTP server and listen for connections
  await new Promise<void>((resolve) => httpServer.listen(SERVER_PORT, resolve));

  // Start WebSocket server for GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: httpServer,
      path: '/subscriptions',
    }
  );

  // Feeder job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { seconds: feedJobInterval, runImmediately: true },
      feeder
    )
  );

  // Cleaner job
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob(
      { seconds: cleanJobInterval, runImmediately: true },
      cleaner
    )
  );

  console.log(`
✅ Server started
⚙️  Environment: ${NODE_ENV}
🔥 Feed interval: ${feedJobInterval} seconds
🗑  Clean interval: ${cleanJobInterval} seconds
💧 GraphQL endpoint: http://localhost:${SERVER_PORT}/graphql
🌱 GraphQL subscriptions: ws://localhost:${SERVER_PORT}/subscriptions
`);
})();
