"use server";

import { registerSchema } from "@/app/auth/register/schemas";
import { parseWithZod } from "@conform-to/zod";

export async function register(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
}
