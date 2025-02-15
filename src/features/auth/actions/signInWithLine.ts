"use server";

import { signIn } from "@/auth";
export async function signInWithLINE() {
  await signIn("line", { redirectTo: "/" });
}
