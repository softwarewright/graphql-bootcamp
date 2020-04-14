export default {
  posts({ id }, _, { db }) {
    return db.posts.filter(p => p.author === id);
  },
  comments({ id }, _, { db }) {
    return db.comments.filter(c => c.author === id);
  }
}