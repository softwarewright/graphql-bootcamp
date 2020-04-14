import { GraphQLServer } from 'graphql-yoga';
import * as resolvers from './resolvers';

import db from './db';

// Resolvers
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
})
server.start(() =>console.log('Server is running on 4000'))