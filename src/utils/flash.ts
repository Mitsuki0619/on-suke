"use server";

import { cookies } from "next/headers";

export async function flash({
  title,
  message,
}: { title: string; message?: string }) {
  const value = JSON.stringify({ title, message });
  (await cookies()).set("flash", value, { maxAge: 1 });
}
