import { getUserId } from "../../utils";
import { MutationResolvers } from "../../generated/codegen";

const publish: MutationResolvers.PublishResolver = async (
  parent,
  { id },
  ctx,
  info
) => {
  const userId = getUserId(ctx);
  const postExists = await ctx.prisma.$exists.post({
    id,
    author: { id: userId }
  });
  if (!postExists) {
    throw new Error(`Post not found or you're not the author`);
  }

  return ctx.prisma.updatePost({
    where: { id },
    data: { published: true }
  });
};

export default publish;
