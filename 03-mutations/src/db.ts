import { User, Comment, Post } from './types';

export let users: User[] = [
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

export let posts: Post[] = [
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



export let comments: Comment[] = [
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