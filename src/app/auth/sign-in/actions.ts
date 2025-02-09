"use server";
import "server-only";
import { signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function logout() {
  await signOut({
    redirectTo: "/sign-in",
  });
}
