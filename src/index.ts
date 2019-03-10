import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";

const app = express();
const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync("./src/schema.graphql", "utf-8"),
  resolvers
});
const server = new ApolloServer({
  schema,
  context: request => ({
    ...request,
    prisma
  })
});

server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on http://localhost:4000`)
);
