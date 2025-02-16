"use server";

import { auth } from "@/auth";
import { addScheduleSchema } from "@/features/schedule/schemas/addScheduleSchema";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

export async function addSchedule(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: addScheduleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  let redirectTo: string;

  const {
    title,
    description,
    startTime,
    endTime,
    urls,
    categoryId,
    note,
    tasks,
  } = submission.value;
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new AuthError();
    }
    await prisma.schedule.create({
      select: {
        id: true,
      },
      data: {
        title,
        description,
        categoryId,
        startTime,
        endTime,
        userId,
        note,
        tasks: {
          create: tasks.map((task) => ({
            title: task.title,
            userId,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startTime,
            endTime,
          })),
        },
        urls: {
          create: urls.map((url) => ({
            url: url.url,
            name: url.name,
          })),
        },
      },
    });
    await flash({ title: "予定が追加されました！" });
  } catch (e) {
    await flash({ title: "予定の登録中にエラーが発生しました。" });
    throw e;
  }
  return submission.reply({ resetForm: true });
}
