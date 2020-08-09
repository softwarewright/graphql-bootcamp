import { GraphQLServer } from 'graphql-yoga';
import * as db from './db';
import { Comment, Mutation, Post, Query, User} from './resolvers'


// Scalar Types:
// String, Boolean, Int, Float, ID (used to represent unique identifiers different from String)

// resolvers - functions that run for the functionality of your API

const resolvers = {
    Query,
    Mutation,
    Comment,
    Post,
    User
};

const server = new GraphQLServer({
    // typedefs (schema) - operations and data structures of your API
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db
    },

});

server.start(({ port }: any) => console.log(`Server running on port: ${port}`))
