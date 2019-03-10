import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MutationResolvers } from "../../generated/codegen";

const signupResolver: MutationResolvers.SignupResolver = async (
  parent,
  args,
  ctx
) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.prisma.createUser({ ...args, password });

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  };
};

export default signupResolver;
