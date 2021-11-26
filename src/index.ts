import 'dotenv-flow/config';
import 'reflect-metadata';

// import { ApolloServer } from 'apollo-server-express';
// import * as tq from 'type-graphql';
import app from './app';
// import { context } from './context';

const { SERVER_PORT = 5000, NODE_ENV } = process.env;

(async () => {
  /**
   * ApolloServer configuration
   */
  // const server = new ApolloServer({
  //   schema: await tq.buildSchema({
  //     resolvers: [],
  //     emitSchemaFile: 'schema.graphql',
  //   }),
  //   context,
  // });
  // await server.start();

  /**
   * Connect ApolloServer to Express
   */
  // server.applyMiddleware({ app, path: '/graphql' });

  /**
   * Start Express server
   */
  app.listen(SERVER_PORT, () => {
    console.log(
      `🔥 ${NODE_ENV} graphql -> http://localhost:${SERVER_PORT}/graphql`
    );
  });
})();
