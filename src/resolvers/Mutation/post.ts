import { getUserId, Context } from "../../utils";
import { MutationResolvers } from "../../generated/codegen";

const createDraft: MutationResolvers.CreateDraftResolver = async (
  parent,
  { title, content },
  ctx,
  info
) => {
  const userId = getUserId(ctx);
  return ctx.prisma.createPost({
    title,
    content,
    author: {
      connect: { id: userId }
    }
  });
};

const publish: MutationResolvers.PublishResolver = async (
  parent,
  { id },
  ctx: Context,
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

export const post = {
  createDraft,
  publish,
  deletePost
};
