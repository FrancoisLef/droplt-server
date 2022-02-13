import 'reflect-metadata';

import dotenv from 'dotenv-flow';

dotenv.config({
  silent: true,
});

import '../services/transmission';

// import { TorrentCrudResolver, UserCrudResolver } from './schema/__generated__';
import { resolvers } from '@generated/type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import * as TypeGraphql from 'type-graphql';

import app from './app';
// import { feed } from './jobs';
import prisma from './prisma';
// import { CustomTorrentResolver } from './schema/torrent';
// import { pubSub } from './services/pubSub';
// import { pubSub } from './services/redis';

const { SERVER_PORT = 4000, NODE_ENV } = process.env;

(async () => {
  // Encapsulate Express App into a HTTP server
  // So that we can re-use the HTTP server instance to listen for WebSocket
  // Useful for GraphQL subscriptions
  const httpServer = http.createServer(app);

  // Build GraphQL schema
  const schema = await TypeGraphql.buildSchema({
    // resolvers: [CustomTorrentResolver, TorrentCrudResolver, UserCrudResolver],
    resolvers,
    emitSchemaFile: 'public/schema.graphql',
    // pubSub,
  });

  // ApolloServer configuration
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
      user: req.user,
      prisma,
    }),
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

  // // Start in-memory job scheduler
  // new ToadScheduler().addSimpleIntervalJob(
  //   new SimpleIntervalJob({ milliseconds: parseInt(JOB_INTERVAL, 10) }, feed)
  // );

  console.log(`
✅ Server started
⚙️  Environment: ${NODE_ENV}
💧 GraphQL endpoint: http://localhost:${SERVER_PORT}/graphql
🌱 GraphQL subscriptions: ws://localhost:${SERVER_PORT}/subscriptions
`);
})();
