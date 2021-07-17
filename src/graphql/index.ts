import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { connectionTypeorm } from '../config/typeorm';
import { PostResolver } from './resolvers/post';

export const initGraphql = async (app: Application) => {
  const connection = await connectionTypeorm();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, connection }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
};
