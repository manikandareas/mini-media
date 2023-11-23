import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { db } from "./server/db";

export const authConfig = {
  providers: [GitHub],
  adapter: PrismaAdapter(db),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(authConfig);
