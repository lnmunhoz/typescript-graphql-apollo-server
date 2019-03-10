import Query from "./Query";
import Mutation from "./Mutation";
import { Subscription } from "./Subscription";
import { User } from "./User";
import { Post } from "./Post";
import { IResolvers } from "../generated/codegen";

const resolvers: IResolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post
} as any; // Waiting this PR to be released https://github.com/dotansimha/graphql-code-generator/pull/1389

export default resolvers;
