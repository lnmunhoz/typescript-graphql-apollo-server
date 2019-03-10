import { UserResolvers } from "../generated/codegen";

export const User: UserResolvers.Resolvers = {
  posts: ({ id }, args, ctx) => {
    return ctx.prisma.user({ id }).posts();
  }
};
