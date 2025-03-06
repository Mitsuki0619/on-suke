"use server";

import { LogicException } from "@/errors";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { flash } from "@/utils/flash";

export async function disconnectLineAccount() {
  const { user } = await checkAuth();
  if (user.id == null) {
    throw new LogicException("ユーザーIDが存在しません。");
  }
  await prisma.account.deleteMany({
    where: {
      provider: "line",
      userId: user.id,
    },
  });
  await flash({ title: "LINE連携を解除しました！" });

  revalidatePath("/settings/user");
}
