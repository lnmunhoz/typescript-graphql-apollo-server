import { QueryResolvers } from "../../generated/codegen";

const feedResolver: QueryResolvers.FeedResolver = async (parent, args, ctx) => {
  return ctx.prisma.posts({ where: { published: true } });
};

export default feedResolver;
