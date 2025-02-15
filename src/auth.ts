import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    LineProvider({
      clientId: process.env.LINE_CHANNEL_ID,
      clientSecret: process.env.LINE_CHANNEL_SECRET,
      checks: ["state"],
    }),
  ],
  callbacks: {
    async authorized({ request, auth }) {
      if (auth?.user) {
        if (request.nextUrl.pathname.startsWith("/auth")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return true;
      }
      if (request.nextUrl.pathname.startsWith("/auth")) {
        return true;
      }
      return false;
    },
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
});
