import { LocalContext, User, Post, Comment } from "../types";
import { v4 as uuid } from 'uuid';

export default {
    createUser(parent: any, args: { data: Pick<User, 'name' | 'email' | 'age'> }, context: LocalContext, info: any) {
        const usersExists = context.db.users.some(user => user.email === args.data.email);

        if(usersExists) {
            throw new Error('User already exists!');
        }
        
        const createdUser: User = {
            id: uuid(),
            ...args.data,
        };

        context.db.users.push(createdUser);
        
        return createdUser;
    },
    deleteUser(parent: any, args: { id: string}, context: LocalContext) {
        const userIndex = context.db.users.findIndex(u => u.id === args.id);

        if(userIndex === -1) throw Error('User does not exist');

        const deletedUser = context.db.users.splice(userIndex, 1)[0];

        context.db.posts = context.db.posts.filter(p => p.author !== deletedUser.id);
        context.db.comments = context.db.comments.filter(c => c.author !== deletedUser.id);

        return deletedUser;
    },
    createPost(parent: any, args: { data: Pick<Post, 'author' | 'body' | 'published' | 'title'> }, context: LocalContext) {
        const userExists = context.db.users.some(u => u.id === args.data.author);

        if(!userExists) {
            throw new Error('The user does not exist');
        }

        const post: Post = {
            id: uuid(),
            ...args.data
        }

        context.db.posts.push(post);

        return post;
    },
    deletePost(parent: any, args: { id: string }, context: LocalContext) {
        const postIndex = context.db.posts.findIndex(p => p.id === args.id)

        if(postIndex === -1) throw Error('Post does not exist')
        
        const deletedPost = context.db.posts.splice(postIndex, 1)[0];

        context.db.comments = context.db.comments.filter(c => c.post === deletedPost.id);

        return deletedPost;
    },
    createComment(parent: any, args: { data: Pick<Comment, 'text' | 'post' | 'author'> }, context: LocalContext) {
        const userExists = context.db.users.some(u => u.id === args.data.author)
        const postExists = context.db.posts.some(p => p.id === args.data.post && p.published)

        if(!userExists) throw new Error('User does not exist');
        if(!postExists) throw new Error('Post does not exist, or is not published.');

        const comment: Comment = {
            id: uuid(),
            ...args.data
        };

        context.db.comments.push(comment);

        return comment;
    },
    deleteComment(parent: any, args: { id: string }, context: LocalContext) {
        const commentIndex = context.db.comments.findIndex(c => c.id === args.id);

        if(commentIndex === -1) throw new Error('Comment does not exist');

        return context.db.comments.splice(commentIndex, 1)[0];
    }
}