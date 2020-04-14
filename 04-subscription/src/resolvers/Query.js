export default {
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
  users(_, { query }, { db }) {
    if (query) return db.users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()))

    return db.users
  },
  posts(_, { query }, { db }) {
    if (query) {
      return db.posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.body.toLowerCase().includes(query.toLowerCase()));
    }

    return db.posts;
  },
  comments(_, _2, { db }) {
    return db.comments
  }
}