import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as resolvers from './resolvers';

import db from './db';

const pubsub = new PubSub();

// Resolvers
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub
  }
})
server.start(() =>console.log('Server is running on 4000'))