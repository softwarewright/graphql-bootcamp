import { LocalContext, Post } from "../types";

export default {
    author(parent: Post, _: any, context: LocalContext) {
        const { author } = parent;

        return context.db.users.find(user => user.id === author)!;
    },
    comments(parent: Post, _: any, context: LocalContext) {
        const { id } = parent;

        return context.db.comments.filter(comment => comment.post === id);
    }
}