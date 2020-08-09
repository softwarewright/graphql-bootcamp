import * as db from './db'

export interface LocalContext {
  db: typeof db
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

export interface Post {
  id: string
  title: string
  body: string
  published?: boolean
  author: string
}

export interface Comment {
  id: string
  text: string
  author: string
  post: string
}