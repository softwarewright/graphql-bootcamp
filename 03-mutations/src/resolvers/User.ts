import { User, LocalContext } from '../types'

export default {
    posts(parent: User, _: any, context: LocalContext) {
        const { id } = parent;
        return context.db.posts.filter(p => p.author === id);
    },
    comments(parent: User, _: any, context: LocalContext) {
        const { id } = parent;
        return context.db.comments.filter(c => c.author === id);
    }
}