import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { auth } from "./Mutation/auth";
import { post } from "./Mutation/post";
import { User } from "./User";
import { Post } from "./Post";
import { IResolvers } from "../generated/codegen";

const resolvers: IResolvers = {
  Query,
  Mutation: {
    ...auth,
    ...post
  },
  Subscription,
  User,
  Post
} as any; // Waiting this PR to be released https://github.com/dotansimha/graphql-code-generator/pull/1389

export default resolvers;
