"use server";

import { auth } from "@/auth";
import { editScheduleSchema } from "@/features/schedule/schemas/editScheduleSchema";
import prisma from "@/lib/prisma";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import "server-only";

export async function editSchedule(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: editScheduleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const {
    scheduleId,
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

    await prisma.$transaction(async (tx) => {
      // タスクの更新（すでにあるタスクはupdate、新規はcreate、既存から消えたものはdelete）
      const existingTaskIds = await tx.task.findMany({
        where: {
          scheduleId,
          userId,
        },
        select: {
          id: true,
        },
      });
      const existingTaskIdsSet = new Set(
        existingTaskIds.map((task) => task.id),
      );
      const newTaskIdsSet = new Set(
        tasks.map((task) => task.id).filter((id) => id),
      );
      await tx.task.deleteMany({
        where: {
          id: {
            in: Array.from(existingTaskIdsSet).filter(
              (id) => !newTaskIdsSet.has(id),
            ),
          },
        },
      });
      await Promise.all(
        tasks.map(async (task) => {
          if (task.id && existingTaskIdsSet.has(task.id)) {
            await tx.task.update({
              where: { id: task.id },
              data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
              },
            });
          } else {
            await tx.task.create({
              data: {
                title: task.title,
                userId,
                description: task.description,
                status: task.status,
                priority: task.priority,
                scheduleId,
                startTime,
                endTime,
              },
            });
          }
        }),
      );

      // URLをデリートインサート
      await tx.url.deleteMany({
        where: {
          scheduleId,
        },
      });
      await tx.url.createMany({
        data: urls.map((url) => ({
          url: url.url,
          name: url.name,
          scheduleId,
        })),
      });

      // 予定を更新
      return await tx.schedule.update({
        where: {
          id: scheduleId,
          userId,
        },
        data: {
          title,
          description,
          categoryId,
          startTime,
          endTime,
          userId,
          note,
        },
      });
    });
    revalidatePath("/schedule/calendar");
    return submission.reply({ resetForm: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
