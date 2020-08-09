import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

interface User {
    id: string
    name: string
}

const users: User[] = [
    {
        id: uuid(),
        name: 'Software Wright'
    }
];

const typeDefs = `
    type Query {
        me: User!
        users: [User!]!
    }

    type Mutation {
        createUser(input: UserInput): User!
    }

    input UserInput {
        name: String!
    }

    type User {
        id: ID!
        name: String!
    }
`

const resolvers = {
    Query: {
        users() {
            return users;
        },
        me() {
            return {
                name: 'Software Wright'
            }
        }
    },
    Mutation: {
        createUser(parent: any, args: { input: Pick<User, 'name'> }, context: any, info: any) {
            const user = {
                id: uuid(),
                ...args.input
            };

            users.push(user);

            return user;
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(({ port }: any) => console.log(`Server running on port: ${port}`))
