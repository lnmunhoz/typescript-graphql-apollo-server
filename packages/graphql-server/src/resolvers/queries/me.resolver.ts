import { QueryResolvers } from "../../generated/codegen";
import { getUserId } from "../../utils";

const meResolver: QueryResolvers.MeResolver = (parent, args, ctx) => {
  const id = getUserId(ctx);
  return ctx.prisma.user({ id });
};

export default meResolver;
