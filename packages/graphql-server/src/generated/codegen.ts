export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  feed: Post[];

  drafts: Post[];

  post?: Maybe<Post>;

  me?: Maybe<User>;

  fetchWebsites: boolean;

  searchItems: boolean;

  searchUsers: User[];
}

export interface Post {
  id: string;

  published: boolean;

  title: string;

  content: string;

  author: User;
}

export interface User {
  id: string;

  email: string;

  name: string;

  posts: Post[];
}

export interface Mutation {
  signup: AuthPayload;

  login: AuthPayload;

  createDraft: Post;

  publish: Post;

  deletePost: Post;

  technologies: User;

  updateProfile: boolean;
}

export interface AuthPayload {
  token: string;

  user: User;
}

export interface Subscription {
  feedSubscription?: Maybe<Post>;
}

// ====================================================
// Arguments
// ====================================================

export interface PostQueryArgs {
  id: string;
}
export interface SignupMutationArgs {
  email: string;

  password: string;

  name: string;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface CreateDraftMutationArgs {
  title: string;

  content: string;
}
export interface PublishMutationArgs {
  id: string;
}
export interface DeletePostMutationArgs {
  id: string;
}

import { GraphQLResolveInfo } from "graphql";

import { Post, User } from "./prisma-client";

import { Context } from "../utils";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    feed?: FeedResolver<Post[], TypeParent, TContext>;

    drafts?: DraftsResolver<Post[], TypeParent, TContext>;

    post?: PostResolver<Maybe<Post>, TypeParent, TContext>;

    me?: MeResolver<Maybe<User>, TypeParent, TContext>;

    fetchWebsites?: FetchWebsitesResolver<boolean, TypeParent, TContext>;

    searchItems?: SearchItemsResolver<boolean, TypeParent, TContext>;

    searchUsers?: SearchUsersResolver<User[], TypeParent, TContext>;
  }

  export type FeedResolver<
    R = Post[],
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type DraftsResolver<
    R = Post[],
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type PostResolver<
    R = Maybe<Post>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, PostArgs>;
  export interface PostArgs {
    id: string;
  }

  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type FetchWebsitesResolver<
    R = boolean,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type SearchItemsResolver<
    R = boolean,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type SearchUsersResolver<
    R = User[],
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace PostResolvers {
  export interface Resolvers<TContext = Context, TypeParent = Post> {
    id?: IdResolver<string, TypeParent, TContext>;

    published?: PublishedResolver<boolean, TypeParent, TContext>;

    title?: TitleResolver<string, TypeParent, TContext>;

    content?: ContentResolver<string, TypeParent, TContext>;

    author?: AuthorResolver<User, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = Post,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type PublishedResolver<
    R = boolean,
    Parent = Post,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type TitleResolver<
    R = string,
    Parent = Post,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type ContentResolver<
    R = string,
    Parent = Post,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type AuthorResolver<
    R = User,
    Parent = Post,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = Context, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>;

    email?: EmailResolver<string, TypeParent, TContext>;

    name?: NameResolver<string, TypeParent, TContext>;

    posts?: PostsResolver<Post[], TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type EmailResolver<
    R = string,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = string,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type PostsResolver<
    R = Post[],
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    signup?: SignupResolver<AuthPayload, TypeParent, TContext>;

    login?: LoginResolver<AuthPayload, TypeParent, TContext>;

    createDraft?: CreateDraftResolver<Post, TypeParent, TContext>;

    publish?: PublishResolver<Post, TypeParent, TContext>;

    deletePost?: DeletePostResolver<Post, TypeParent, TContext>;

    technologies?: TechnologiesResolver<User, TypeParent, TContext>;

    updateProfile?: UpdateProfileResolver<boolean, TypeParent, TContext>;
  }

  export type SignupResolver<
    R = AuthPayload,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, SignupArgs>;
  export interface SignupArgs {
    email: string;

    password: string;

    name: string;
  }

  export type LoginResolver<
    R = AuthPayload,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, LoginArgs>;
  export interface LoginArgs {
    email: string;

    password: string;
  }

  export type CreateDraftResolver<
    R = Post,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, CreateDraftArgs>;
  export interface CreateDraftArgs {
    title: string;

    content: string;
  }

  export type PublishResolver<
    R = Post,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, PublishArgs>;
  export interface PublishArgs {
    id: string;
  }

  export type DeletePostResolver<
    R = Post,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, DeletePostArgs>;
  export interface DeletePostArgs {
    id: string;
  }

  export type TechnologiesResolver<
    R = User,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type UpdateProfileResolver<
    R = boolean,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<TContext = Context, TypeParent = AuthPayload> {
    token?: TokenResolver<string, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;
  }

  export type TokenResolver<
    R = string,
    Parent = AuthPayload,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = AuthPayload,
    TContext = Context
  > = Resolver<R, Parent, TContext>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    feedSubscription?: FeedSubscriptionResolver<
      Maybe<Post>,
      TypeParent,
      TContext
    >;
  }

  export type FeedSubscriptionResolver<
    R = Maybe<Post>,
    Parent = {},
    TContext = Context
  > = SubscriptionResolver<R, Parent, TContext>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  Context
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  Context
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  Context
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export type IResolvers<TContext = Context> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  Post?: PostResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  AuthPayload?: AuthPayloadResolvers.Resolvers<TContext>;
  Subscription?: SubscriptionResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
