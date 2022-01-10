import './bootstrap';
import './services/transmission';

import { ApolloServer } from 'apollo-server-express';
import { SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import * as TypeGraphql from 'type-graphql';

import app from './app';
import { feeder } from './jobs';
import prisma from './prisma';
import {
  FindManyTorrentResolver,
  FindManyUserResolver,
} from './schema/__generated__';
import { CustomTorrentResolver } from './schema/torrent';
import { pubSub } from './services/redis';

const { SERVER_PORT = 4000, NODE_ENV } = process.env;

(async () => {
  /**
   * In-memory jobs scheduler
   */
  new ToadScheduler().addSimpleIntervalJob(
    new SimpleIntervalJob({ milliseconds: 250 }, feeder)
  );

  /**
   * ApolloServer configuration
   */
  const server = new ApolloServer({
    schema: await TypeGraphql.buildSchema({
      resolvers: [
        FindManyUserResolver,
        FindManyTorrentResolver,
        CustomTorrentResolver,
      ],
      emitSchemaFile: 'public/schema.graphql',
      pubSub,
    }),
    context: ({ req }) => ({
      req,
      user: req.user,
      prisma,
    }),
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
