import { PostResolvers } from "../generated/codegen";

export const Post: PostResolvers.Resolvers = {
  author: ({ id }, args, ctx) => {
    return ctx.prisma.post({ id }).author();
  }
};
