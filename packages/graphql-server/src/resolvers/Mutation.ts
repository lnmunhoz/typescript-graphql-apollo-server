import { MutationResolvers } from "../generated/codegen";
import createDraft from "./mutations/createDraft.resolver";
import deletePost from "./mutations/deletePost.resolver";
import login from "./mutations/login.resolver";
import publish from "./mutations/publish.resolver";
import signup from "./mutations/signup.resolver";
import updateProfile from "./mutations/updateProfile.resolver";

const Mutation: MutationResolvers.Resolvers = {
  createDraft,
  deletePost,
  login,
  publish,
  signup,
  updateProfile
};

export default Mutation;
