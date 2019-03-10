import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MutationResolvers } from "../../generated/codegen";

const login: MutationResolvers.LoginResolver = async (
  parent,
  { email, password },
  ctx
) => {
  const user = await ctx.prisma.user({ email });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  };
};

export default login;
