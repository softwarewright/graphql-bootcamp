import { GraphQLServer } from 'graphql-yoga';
// Scalar Types:
// String, Boolean, Int, Float, ID (used to represent unique identifiers different from String)


// typedefs (schema) - operations and data structures of your API

const typeDefs = `
    type Query {
        greeting(name: String!): String!
        add(numbers: [Float!]!): Float!
        grades: [Float!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: String!
        title: String!
        body: String!
        published: Boolean!
    }
`

// resolvers - functions that run for the functionality of your API

const resolvers = {
    Query: {
        // 
        greeting(parent:any, args:any, ctx:any, info:any) {
            if(args.name) {
                return `Hello ${args.name}`
            }
            
            return 'Hello';
        },
        add(_:any, args: {numbers: number[] }, ctx: any, info: any) {
            const { numbers } = args;

            return numbers.reduce( (acc, curr) => acc + curr, 0);
        },
        grades(parent: any) {
            return [90.4, 100.5, 95.5]
        },
        me() {
            return {
                id: 'abc123',
                name: 'Software Wright',
                age: 45,
                email: 'software@email.com'
            }
        },
        post() {
            return {
                id: 'post123',
                title: 'My Favorite Post',
                body: 'The body of my favorite post',
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(({ port }) => console.log(`Server running on port: ${port}`))