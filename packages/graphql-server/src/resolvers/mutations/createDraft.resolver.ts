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

export default createDraft;
