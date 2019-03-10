import { QueryResolvers } from "../generated/codegen";
import drafts from "./queries/drafts.resolver";
import feed from "./queries/feed.resolver";
import fetchWebsites from "./queries/fetchWebsites.resolver";
import me from "./queries/me.resolver";
import post from "./queries/post.resolver";
import searchItems from "./queries/searchItems.resolver";
import searchUsers from "./queries/searchUsers.resolver";

const Query: QueryResolvers.Resolvers = {
  drafts,
  feed,
  fetchWebsites,
  me,
  post,
  searchItems,
  searchUsers
};

export default Query;
