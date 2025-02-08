"use server";

import "server-only";
import prisma from "@/lib/prisma";

export async function fetchAllCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
  });
  return categories;
}
