import { GraphQLServer } from 'graphql-yoga';

// Scalar types
// String, Boolean, Int, Float, ID (Similar to string) 

const users = [{
  id: '1',
  name: 'Darrius',
  email: 'darrius@example.com',
  age: 25
}, {
  id: '2',
  name: 'James',
  email: 'james@example.com'
},{
  id: '3',
  name: 'Mike',
  email: 'mike@example.com',
  age: 32
}]

const posts = [
  {
    id: 'post-1',
    title: 'A Great Post',
    body: 'The body of a great post',
    published: true,
    author: '1'
  },
  {
    id: 'post-2',
    title: 'Another Post',
    body: 'The body of another post',
    published: false,
    author: '1'
  },
  {
    id: 'post-3',
    title: 'Not your average post',
    body: 'The body of not your average post',
    published: false,
    author: '2'
  }
]

const comments = [
  {
    id: 'comment-1',
    text: 'Wow!',
    author: '1',
    post: 'post-1'
  },
  {
    id: 'comment-2',
    text: 'Amazing!',
    author: '1',
    post: 'post-3'
  },
  {
    id: 'comment-3',
    text: 'Great Content!',
    author: '3',
    post: 'post-3'
  },
  {
    id: 'comment-4',
    text: 'What in the world does this mean?',
    author: '3',
    post: 'post-2'
  }
]

// type definitions
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
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
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123abc',
        name: 'Darrius',
        email: 'darriuswright27@gmail.com'
      }
    },
    post() {
      return { 
        id: 'post-123',
        title: 'The First Post',
        body: 'The Greatest post ever!',
        published: true,
        author: '1'
      }
    },
    users(_, {query}) {
      if(query) return users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()))

      return users
    },
    posts(_, {query}) {
      if(query) {
        return posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ||  p.body.toLowerCase().includes(query.toLowerCase()) );
      }

      return posts;
    },
    comments() {
      return comments
    }
    // // parent, args, context, info
    // greeting(_, args) {
    //   console.log(args)
    //   return `Hello ${args.name || 'friend'} you are a great ${args.position || 'person'}!`
    // },
    // add(_, {numbers}) {
    //   return numbers.reduce( (acc, cur) => acc + cur, 0);
    // },
    // grades() {
    //   return [89, 23]
    // }
  },
  Post: {
    author({ author }) {
      return users.find(user => {
        return user.id === author
      })
    },
    comments({ id }) {
      return comments.filter( c => c.post === id);
    }
  },
  Comment: {
    author({ author }) {
      return users.find( u => u.id === author);
    },
    post({ post }) {
      return posts.find(p => p.id === post);
    }
  },
  User: {
    posts({ id }) {
      return posts.filter(p => p.author === id);
    },
    comments({id}) {
      return comments.filter(c => c.author === id);
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers})
server.start(() =>console.log('Server is running on 4000'))