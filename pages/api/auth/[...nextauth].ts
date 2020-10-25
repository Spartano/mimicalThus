import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  globalThis["prisma"] = globalThis["prisma"] || new PrismaClient();
  prisma = globalThis["prisma"];
}

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
      authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
};

export default (req, res) => NextAuth(req, res, options);
