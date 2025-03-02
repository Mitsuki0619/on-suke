import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();
  if (session?.user == null) {
    redirect("/auth/sign-in");
  }
  return { user: session.user };
}
