"use server";

import "server-only";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { AuthError } from "next-auth";

export async function fetchAllCategories() {
  const session = await auth();
  if (session?.user == null) {
    throw new AuthError();
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
    where: {
      master: {
        userId: session.user.id,
      },
    },
    orderBy: {
      created_at: "asc",
    },
  });
  return categories;
}

export type FetchAllCategoriesReturnType = Awaited<
  ReturnType<typeof fetchAllCategories>
>;
