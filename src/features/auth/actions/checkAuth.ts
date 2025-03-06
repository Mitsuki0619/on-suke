import { auth } from "@/auth";
import { flash } from "@/utils/flash";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();
  if (session?.user == null) {
    await flash({ title: "ログインしてください。" });
    redirect("/auth/sign-in");
  }
  return { user: session.user };
}
