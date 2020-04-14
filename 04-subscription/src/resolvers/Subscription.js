export default {
  count: {
    subscribe(_, _2, {pubsub}) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count
        });
      }, 1000)

      return pubsub.asyncIterator('count');
    }
  },
  comment: {
    subscribe(_, { postId }, { pubsub, db }) {
      const post = db.posts.find(p => p.id === postId && p.published);

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`${postId}-comments`)
    }
  },
  post: {
    subscribe(_, _2, { pubsub }) {
      return pubsub.asyncIterator('post')
    }
  }
}