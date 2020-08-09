# GraphQL Basics: Schemas and queries

## What is a Graph

Think about the following example...

Users have posts, and posts have comments. In addition users have comments.

Each of these have fields: title, body for posts and name or age for users.

## GraphQL Queries

There are 3 major types of operations that you can perform in graphql: query, mutation and subscription.

``` gql
query {
    posts {
        id
        title

    }
}
```

As you can see you have to select the fields that you would like to return from your graphql request.

By nature all graphql APIs are self documenting APIs. As you create the graphql schemas and type definitions you are fully documenting your API.

[GraphQL Specification](http://spec.graphql.org/)