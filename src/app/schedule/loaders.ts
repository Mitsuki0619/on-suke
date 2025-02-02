"use server";

import prisma from "@/lib/prisma";

export async function fetchAllCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}
