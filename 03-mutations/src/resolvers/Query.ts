import { LocalContext } from "../types";

export default  {
    users(parent:any, args: { query?:string }, context: LocalContext, info: any) {
        const { query } = args;

        if(query) return context.db.users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))

        return context.db.users
    },
    posts(parent: any, args: { query?: string}, context: LocalContext, info: any) {
        const { query } = args;

        if(query) { 
            return context.db.posts.filter(({title, body }) => body.toLowerCase().includes(query.toLowerCase()) || title.toLowerCase().includes(query.toLowerCase()))
        }

        return context.db.posts;
    },
    comments(parent: any, args: {query?:string}, context: LocalContext, info: any) {
        const { query } = args;

        if(query) {
            return context.db.comments.filter(c => c.text.toLowerCase().includes(query.toLowerCase()));
        }

        return context.db.comments;
    },
    post() {
        return {
            id: 'post123',
            title: 'My Favorite Post',
            body: 'The body of my favorite post',
            published: false
        }
    },
    me() {
        return {
            id: 'abc123',
            name: 'Software Wright',
            age: 45,
            email: 'software@email.com'
        }
    },
}