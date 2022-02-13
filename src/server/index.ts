import 'reflect-metadata';

import dotenv from 'dotenv-flow';

dotenv.config({
  silent: true,
});

import { resolvers } from '@generated/type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as TypeGraphql from 'type-graphql';

import prisma from '../services/prisma';
import app from './app';

const { SERVER_PORT = 4000, NODE_ENV } = process.env;

(async () => {
  // Encapsulate Express App into a HTTP server
  // So that we can re-use the HTTP server instance to listen for WebSocket
  // Useful for GraphQL subscriptions
  const httpServer = http.createServer(app);

  // Build GraphQL schema
  const schema = await TypeGraphql.buildSchema({
    resolvers,
    emitSchemaFile: 'public/schema.graphql',
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

  console.log(`
✅ Server started
⚙️  Environment: ${NODE_ENV}
💧 GraphQL endpoint: http://localhost:${SERVER_PORT}/graphql
🌱 GraphQL subscriptions: ws://localhost:${SERVER_PORT}/subscriptions
`);
})();
