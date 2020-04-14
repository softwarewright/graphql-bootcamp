export default {
  author({ author }, _, { db }) {
    return db.users.find(u => u.id === author);
  },
  post({ post }, _, { db }) {
    return db.posts.find(p => p.id === post);
  }
}