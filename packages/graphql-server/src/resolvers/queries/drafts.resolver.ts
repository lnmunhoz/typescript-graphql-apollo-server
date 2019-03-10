import { QueryResolvers } from "../../generated/codegen";
import { getUserId } from "../../utils";

const draftsResolver: QueryResolvers.DraftsResolver = async (
  parent,
  args,
  ctx
) => {
  const id = getUserId(ctx);

  const where = {
    published: false,
    author: {
      id
    }
  };

  return ctx.prisma.posts({ where });
};

export default draftsResolver;
