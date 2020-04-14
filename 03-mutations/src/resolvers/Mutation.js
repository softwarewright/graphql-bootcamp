import { v4 as uuid } from 'uuid';

export default {
  createUser(_, { data }, { db }) {
    if (db.users.some(u => u.email === data.email)) {
      throw new Error('User already exists');
    }

    const user = {
      id: uuid(),
      ...data
    }

    db.users.push(user)

    return user;
  },
  updateUser(_, {id, data}, { db }) {
    const user = db.users.find(u => u.id === id);
    if (!user) {
      throw new Error("User no found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some(u => u.email === data.email);

      if (emailTaken) {
        throw new Error("The email has been taken");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  deleteUser(_, { id }, { db }) {
    const userIndex = db.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = db.users[userIndex]

    db.users.splice(userIndex, 1);
    db.posts = db.posts.filter(p => {
      const matched = p.author !== user.id

      if (matched) {
        db.comments = db.comments.filter(c => c.post === p.id)
      }

      return matched;
    });
    db.comments = db.comments.filter(c => c.author !== user.id);

    return user;
  },
  createPost(_, { data }, { db }) {
    if (!db.users.some(u => u.id === data.author)) {
      throw new Error("Author does not exist")
    }

    const post = {
      id: uuid(),
      ...data
    };

    db.posts.push(post);

    return post;
  },
  updatePost(_, { id, data }, { db }) {
    const post = db.posts.find(p => p.id === id);

    if (!post) {
      throw new Error('Posts was not found');
    }

    if (typeof data.title === 'string') post.title = data.title
    if (typeof data.body === 'string') post.body = data.body
    if (typeof data.published === 'boolean') post.published = data.published
    
    return post;
  },
  deletePost(_, { id }, { db }) {
    const postIndex = db.posts.findIndex(u => u.id === id);

    if (postIndex === -1) {
      throw new Error("post not found");
    }

    const post = db.posts[postIndex]

    db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(c => c.post !== id);

    return post;
  },
  createComment(_, { data }, { db }) {
    if (!db.users.some(u => u.id === data.author)) {
      throw new Error("Author does not exist")
    }
    if (!db.posts.some(p => p.id === data.post && p.published)) {
      throw new Error("Posts does not exist/ is not published")
    }

    const comment = {
      id: uuid(),
      ...data
    };

    db.comments.push(comment)

    return comment;
  },
  updateComment(_, { id, data }, { db }) {
    const comment = db.comments.find(c => c.id === id);

    if (!comment) {
      throw new Error("Comment cannot be found");
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    return comment;
  },
  deleteComment(_, { id }, { db }) {
    const commentIndex = db.comments.findIndex(c => c.id === id);

    if (commentIndex === -1) {
      throw new Error("Cannot find the comment");
    }

    const comment = db.comments[commentIndex];

    db.comments.splice(commentIndex, 1);

    return comment;
  },

}