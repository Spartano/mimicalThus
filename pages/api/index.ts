import { makeSchema, objectType, stringArg, asNexusMethod, arg, intArg } from "@nexus/schema";
import { GraphQLDate } from "graphql-iso-date";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import path from "path";
import { nexusPrisma } from "nexus-plugin-prisma";

import { getSession } from "next-auth/client";

export const GQLDate = asNexusMethod(GraphQLDate, "date");

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  globalThis["prisma"] = globalThis["prisma"] || new PrismaClient();
  prisma = globalThis["prisma"];
}

const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("image");
    t.string("email");
    t.list.field("UserPassion", {
      type: "UserPassion",
      resolve: async (parent) => {
        return await prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .UserPassion();
      },
    });
    t.list.field("UserBehavior", {
      type: "UserBehavior",
      resolve: (parent) =>
        prisma.user
          .findOne({
            where: { id: Number(parent.id) },
          })
          .UserBehavior(),
    });
  },
});

const Passion = objectType({
  name: "Passion",
  definition(t) {
    t.int("id");
    t.string("name");
    t.list.field("UserPassion", {
      type: "UserPassion",
      resolve: (parent) =>
        prisma.passion
          .findOne({
            where: { id: Number(parent.id) },
          })
          .UserPassion(),
    });
  },
});

const UserPassion = objectType({
  name: "UserPassion",
  definition(t) {
    t.int("id");
    t.int("value");
    t.int("userId");
    t.int("passionId");
    t.field("User", {
      type: "User",
      resolve: (parent) =>
        prisma.userPassion
          .findOne({
            where: { id: Number(parent.id) },
          })
          .User(),
    });
    t.field("Passion", {
      type: "Passion",
      resolve: (parent) =>
        prisma.userPassion
          .findOne({
            where: { id: Number(parent.id) },
          })
          .Passion(),
    });
  },
});

const UserBehavior = objectType({
  name: "UserBehavior",
  definition(t) {
    t.int("id");
    t.int("value");
    t.int("userId");
    t.int("behaviorId");
    t.field("User", {
      type: "User",
      resolve: (parent) =>
        prisma.userBehavior
          .findOne({
            where: { id: Number(parent.id) },
          })
          .User(),
    });
    t.field("Behavior", {
      type: "Behavior",
      resolve: (parent) =>
        prisma.userBehavior
          .findOne({
            where: { id: Number(parent.id) },
          })
          .Behavior(),
    });
  },
});

const Behavior = objectType({
  name: "Behavior",
  definition(t) {
    t.int("id");
    t.string("name");
    t.list.field("UserBehavior", {
      type: "UserBehavior",
      resolve: (parent) =>
        prisma.behavior
          .findOne({
            where: { id: Number(parent.id) },
          })
          .UserBehavior(),
    });
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        email: stringArg({ nullable: true }),
      },
      resolve: async (_, { email }, ctx) => {
        const session = await getSession({ req: ctx.req });

        console.log(ctx, session, "seesion");

        return prisma.user.findFirst({
          where: {
            email,
          },
        });
      },
    });

    t.list.field("users", {
      type: "User",
      args: {
        searchString: stringArg({ nullable: true }),
        // orderBy: arg({ type: "" }),
        skip: intArg({ default: 0 }),
        take: intArg({ default: 5 }),
      },
      resolve: async (_, { searchString, skip, take }, ctx) => {
        const session = await getSession({ req: ctx.req });
        console.log(ctx, session, "seesion");

        const result = await prisma.$queryRaw('SELECT * FROM User;')
        return prisma.user.findMany({
          where: {
            OR: [{ name: { contains: searchString } }, { email: { contains: searchString } }],
            AND:{UserPassion:{every:{Passion:{}}}}
          },
          // orderBy,

          skip,
          take,
        });
      },
    });

    t.field("userCount", {
      type: "Int",
      resolve: async (_, args, ctx) => {
        return prisma.user.count();
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneUser();
    t.field("signupUser", {
      type: "User",
      args: {
        name: stringArg({ nullable: false }),
        image: stringArg(),
        email: stringArg({ nullable: false }),
        userPassions: arg({ list: true, type: "UserPassionCreateWithoutUserInput" }),
        userBehaviors: arg({ list: true, type: "UserBehaviorCreateWithoutUserInput" }),
      },
      resolve: (_, { name, email, userPassions, userBehaviors, image }, ctx) => {
        return prisma.user.create({
          data: {
            image,
            name,
            email,
            UserPassion: { create: userPassions },
            UserBehavior: { create: userBehaviors },
          },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, Passion, Behavior, UserPassion, UserBehavior, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: "/api",
});
