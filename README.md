[![CircleCI](https://circleci.com/gh/lnmunhoz/typescript-graphql-apollo-server.svg?style=svg)](https://circleci.com/gh/lnmunhoz/typescript-graphql-apollo-server)

<h1 align="center"><strong>Boilerplate for an Advanced GraphQL Server w/ TypeScript</strong>
</h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

<div align="center"><strong>🚀 Bootstrap your GraphQL server within seconds</strong></div>
<div align="center">Advanced starter kit for a flexible GraphQL server for TypeScript - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`apollo-server-express`](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-expressa)
- **Static type generation**: TypeScript types for GraphQL queries & mutations are generated in a build step and [`graphql-code-generator`](https://github.com/dotansimha/graphql-code-generator) for generating types for resolvers
- **Authentication**: Signup and login workflows are ready to use for your users
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup
- **Realtime updates**: Support for GraphQL subscriptions

Read more about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Getting started

```sh
# 1. Install dependencies
yarn install

# 2. Run the server
yarn start
```

## Documentation

### Commands

- `yarn start` starts GraphQL server on `http://localhost:4000`
- `yarn prisma:deploy` Deploys the Prisma service to the cluster
- `yarn prisma:reset` Resets the database
- `yarn prisma:seed` Seed the database with data found in `prisma/seed.graphql`
- `yarn codegen` Generate resolver types based on the `src/schema.graphql`

### Project structure

| File name 　　　　　　　　　　　　　　 | Description 　　　　　　　　<br><br>                                                                                                                           |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `├── .env`                             | Defines environment variables                                                                                                                                  |
| `└── database` (_directory_)           | _Contains all files that are related to the Prisma database service_                                                                                           | \  |
| `├── prisma.yml`                       | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `└── datamodel.graphql`                | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51))                                |
| `└── src` (_directory_)                | _Contains the source files for your GraphQL server_                                                                                                            |
| `├── index.ts`                         | The entry point for your GraphQL server                                                                                                                        |
| `├── schema.graphql`                   | The **application schema** defining the API exposed to client applications                                                                                     |
| `├── resolvers` (_directory_)          | _Contains the implementation of the resolvers for the application schema_                                                                                      |
| `└── generated` (_directory_)          | _Contains generated files_                                                                                                                                     |
| `└── prisma-client` (_directory_)      | The generated Prisma client                                                                                                                                    |

## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://www.apollographql.com/) & [Prisma](https://www.prisma.io) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the `#graphql-boilerplate` channel on our [Slack](https://slack.prisma.io/).
