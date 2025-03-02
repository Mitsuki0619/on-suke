"use server";

import { signIn } from "@/auth";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import { revalidatePath } from "next/cache";

export async function connectLineAccount() {
  const { user } = await checkAuth();
  await signIn("line", {
    redirectTo: "/settings/user",
    userId: user.id,
  });
  revalidatePath("/settings/user");
}
