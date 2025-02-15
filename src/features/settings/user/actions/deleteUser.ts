"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";

export async function deleteUser() {
  const { user } = await checkAuth();
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
}
