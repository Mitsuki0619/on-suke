"use server";

import { cookies } from "next/headers";
import { generateRandomString } from "@/utils/generateRandomString";

export async function flash({
  title,
  message,
}: { title: string; message?: string }) {
  const value = JSON.stringify({ key: generateRandomString(), title, message });
  (await cookies()).set("flash", value, { maxAge: 1 });
}
