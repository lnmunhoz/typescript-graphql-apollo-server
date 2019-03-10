import { getUserId } from "../../utils";
import { MutationResolvers } from "../../generated/codegen";

const deletePost: MutationResolvers.DeletePostResolver = async (
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

  return ctx.prisma.deletePost({ id });
};

export default deletePost;
