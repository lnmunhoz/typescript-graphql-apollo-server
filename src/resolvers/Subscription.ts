import { Context } from "../utils";
import { SubscriptionResolvers } from "../generated/codegen";

export const Subscription: SubscriptionResolvers.Resolvers = {
  feedSubscription: {
    subscribe: async (parent, args, ctx) => {
      return ctx.prisma.$subscribe
        .post({
          mutation_in: ["CREATED", "UPDATED"]
        })
        .node();
    }
  }
};
