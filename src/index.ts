import './bootstrap';
import './services/transmission';

import { ApolloServer } from 'apollo-server-express';
import * as tq from 'type-graphql';

import app from './app';
import { FindManyTorrentResolver, FindManyUserResolver } from './generated';
import prisma from './prisma';

const { SERVER_PORT = 4000, NODE_ENV } = process.env;

(async () => {
  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await tq.buildSchema({
      resolvers: [FindManyUserResolver, FindManyTorrentResolver],
      emitSchemaFile: 'public/schema.graphql',
    }),
    context: ({ req }) => {
      const context = {
        req,
        user: req.user,
        prisma,
      };
      return context;
    },
  });
  await server.start();

  /**
   * Connect ApolloServer to Express
   */
  server.applyMiddleware({ app, path: '/graphql' });

  /**
   * Start Express server
   */
  app.listen(SERVER_PORT, () => {
    console.log(
      `🔥 ${NODE_ENV} graphql -> http://localhost:${SERVER_PORT}/graphql`
    );
  });
})();
