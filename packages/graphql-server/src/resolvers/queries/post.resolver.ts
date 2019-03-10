import { QueryResolvers } from "../../generated/codegen";

const postResolver: QueryResolvers.PostResolver = async (parent, args, ctx) => {
  return ctx.prisma.post({ id: args.id });
};

export default postResolver;
