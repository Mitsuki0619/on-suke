"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import { logout } from "@/features/auth/actions/logout";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import { revalidatePath } from "next/cache";

export async function deleteUser() {
  const { user } = await checkAuth();
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  await logout();
  await flash({ title: "アカウントを削除しました。" });
  revalidatePath("/auth/sign-in");
}
