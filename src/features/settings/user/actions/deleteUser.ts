"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import { logout } from "@/features/auth/actions/logout";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser() {
  const { user } = await checkAuth();
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  await logout();
  revalidatePath("/auth/sign-in");
}
