export default {
  author({ author }, _, { db }) {
    return db.users.find(user => {
      return user.id === author
    })
  },
  comments({ id }, _, { db }) {
    return db.comments.filter(c => c.post === id);
  }
}