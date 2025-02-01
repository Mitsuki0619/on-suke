import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
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
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/auth/login",
  },
});
