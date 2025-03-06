"use server";

import { cookies } from "next/headers";

export async function flash(content: { title: string; description?: string }) {
  const parsedFlashContent = JSON.stringify({
    ...content,
    key: crypto.randomUUID(),
  });

  (await cookies()).set("flash", parsedFlashContent, { maxAge: 1 });
}
