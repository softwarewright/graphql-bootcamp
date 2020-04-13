# GraphQL Bootcamp

The client sends a query to the server asking for the exact data that it needs.

*Example graphql query*

``` gql
query {
	posts {
    id, title, published
  },
  users {
    name, email
  },
  hello,
  courseInstructor,
  me {
    name,
    email
  },
  course
}
```