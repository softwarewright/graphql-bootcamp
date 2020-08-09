import { Comment, LocalContext } from "../types";

export default {
    author(parent: Comment, _: any, context: LocalContext) {
        const { author } = parent;

        return context.db.users.find(user => user.id === author);
    },
    post(parent: Comment, _: any, context: LocalContext) {
        const { post } = parent;

        return context.db.posts.find(p => p.id === post);
    }
}