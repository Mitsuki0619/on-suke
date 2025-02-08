"use server";

import { eventSchema } from "@/app/schedule/schemas";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

export async function addEvent(_: unknown, formData: FormData) {
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
              status: "TODO",
            })),
          },
          urls: {
            create: urls.map((url) => ({
              url: url.url,
              name: url.name,
            })),
          },
          categories: {
            connect: categories.map((catId) => ({
              id: catId,
            })),
          },
        },
      });
    });
    await flash("イベントが正常に追加されました！");
    redirect("/schedule/calendar");
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect("/auth/sign-in");
    }
    throw e;
  }
}
