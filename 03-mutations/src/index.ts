import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

interface User {
    id: string;
    name: string;
    email: string;
    age?: number;
}

const users: User[] = [
    {
        id: '1234',
        name: 'Software Wright',
        email: 'software@email.com',
        age: 36
    },
    {
        id: '12345',
        name: 'James Frank',
        email: 'james.frank@email.com',
    },
    {
        id: '12346',
        name: 'Adam Jones',
        email: 'adam.jones@email.com',
        age: 23
    },
]

interface Post {
    id: string
    title: string
    body: string
    published?: boolean
    author: string
}

const posts: Post[] = [
    {
        id: 'post-123',
        body: 'My Post 123 Body',
        published: false,
        title: 'My Post 123',
        author: '1234'
    },
    {
        id: 'post-1234',
        body: 'Another Post 1234 Body',
        published: true,
        title: 'Another Post 1234',
        author: '12345'
    },
    {
        id: 'post-12345',
        body: 'Last Post 1235 Body',
        published: false,
        title: 'Last Post 1235',
        author: '1234'
    }
] 

interface Comment {
    id: string
    text: string
    author: string
    post: string
}

const comments: Comment[] = [
    {
        id: 'comment-123',
        author: '1234',
        post: 'post-123',
        text: 'Hello World'
    },
    {
        id: 'comment-1234',
        author: '1234',
        post: 'post-123',
        text: 'How are you'
    },
    {
        id: 'comment-12345',
        author: '12345',
        post: 'post-12345',
        text: 'My Comment'
    }
]

// Scalar Types:
// String, Boolean, Int, Float, ID (used to represent unique identifiers different from String)

// typedefs (schema) - operations and data structures of your API

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID
    }

    input CreateCommentInput {
        text: String!
        author: ID
        post: ID
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User!
    }

    type Comment {
        id: ID!
        text: String
        author: User!
        post: Post!
    }
`

// resolvers - functions that run for the functionality of your API

const resolvers = {
    Query: {
        users(parent:any, args: { query?:string }, context: any, info: any) {
            const { query } = args;

            if(query) return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))

            return users
        },
        posts(parent: any, args: { query?: string}, context: any, info: any) {
            const { query } = args;

            if(query) { 
                return posts.filter(({title, body }) => body.toLowerCase().includes(query.toLowerCase()) || title.toLowerCase().includes(query.toLowerCase()))
            }

            return posts;
        },
        comments(parent: any, args: {query?:string}, context: any, info: any) {
            const { query } = args;

            if(query) {
                return comments.filter(c => c.text.toLowerCase().includes(query.toLowerCase()));
            }

            return comments;
        },
        post() {
            return {
                id: 'post123',
                title: 'My Favorite Post',
                body: 'The body of my favorite post',
                published: false
            }
        },
        me() {
            return {
                id: 'abc123',
                name: 'Software Wright',
                age: 45,
                email: 'software@email.com'
            }
        },

    },
    Mutation: {
        createUser(parent: any, args: { data: Pick<User, 'name' | 'email' | 'age'> }, context: any, info: any) {
            const usersExists = users.some(user => user.email === args.data.email);

            if(usersExists) {
                throw new Error('User already exists!');
            }
            
            const createdUser: User = {
                id: uuid(),
                ...args.data,
            };

            users.push(createdUser);
            
            return createdUser;
        },
        createPost(parent: any, args: { data: Pick<Post, 'author' | 'body' | 'published' | 'title'> }, context: any) {
            const userExists = users.some(u => u.id === args.data.author);

            if(!userExists) {
                throw new Error('The user does not exist');
            }

            const post: Post = {
                id: uuid(),
                ...args.data
            }

            posts.push(post);

            return post;
        },
        createComment(parent: any, args: { data: Pick<Comment, 'text' | 'post' | 'author'> }) {
            const userExists = users.some(u => u.id === args.data.author)
            const postExists = posts.some(p => p.id === args.data.post && p.published)

            if(!userExists) throw new Error('User does not exist');
            if(!postExists) throw new Error('Post does not exist, or is not published.');


            const comment: Comment = {
                id: uuid(),
                ...args.data
            };

            comments.push(comment);

            return comment;
        }
    },
    User: {
        posts(parent: User) {
            const { id } = parent;

            return posts.filter(p => p.author === id);
        },
        comments(parent: User) {
            const { id } = parent;

            return comments.filter(c => c.author === id);
        }
    },
    Post: {
        author(parent: Post) {
            const { author } = parent;

            return users.find(user => user.id === author)!;
        }
    },
    Comment: {
        author(parent: Comment) {
            const { author } = parent;;

            return users.find(user => user.id === author);
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(({ port }: any) => console.log(`Server running on port: ${port}`))
