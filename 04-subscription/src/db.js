const users = [{
  id: '1',
  name: 'Darrius',
  email: 'darrius@example.com',
  age: 25
}, {
  id: '2',
  name: 'James',
  email: 'james@example.com'
}, {
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
    published: true,
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

export default {
  users,
  posts,
  comments
}