"use server";

import { eventSchema } from "@/app/schedule/schemas";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function addEvent(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: eventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const {
    title,
    description,
    startTime,
    endTime,
    urls,
    categories,
    note,
    tasks,
  } = submission.value;
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new AuthError();
    }
    await prisma.$transaction(async (prisma) => {
      return await prisma.schedule.create({
        data: {
          title,
          description,
          startTime,
          endTime,
          userId,
          note,
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              userId,
              description: task.description,
              status: "TO_DO",
            })),
          },
          urls: {
            create: urls.map((url) => ({
              url: url.url,
              name: url.name,
            })),
          },
          categoryRelations: {
            create: categories.map((categoryId) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },
      });
    });
    return submission.reply();
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect("/auth/sign-in");
    }
    throw e;
  }
}
