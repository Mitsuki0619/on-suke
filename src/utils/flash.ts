"use server";

import { cookies } from "next/headers";

export async function flash(message: string) {
  (await cookies()).set("flash", message, { maxAge: 1 });
}
