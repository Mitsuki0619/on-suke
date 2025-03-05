"use server";

import { signIn } from "@/auth";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import { revalidatePath } from "next/cache";
import { flash } from "@/utils/flash";

export async function connectLineAccount() {
  const { user } = await checkAuth();
  await signIn("line", {
    redirectTo: "/settings/user",
    userId: user.id,
  });
  await flash({ title: "LINEの連携が完了しました！" });
  revalidatePath("/settings/user");
}
