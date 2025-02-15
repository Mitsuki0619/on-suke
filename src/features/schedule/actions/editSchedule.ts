"use server";

import { auth } from "@/auth";
import { editScheduleSchema } from "@/features/schedule/schemas/editScheduleSchema";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
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

    await prisma.$transaction(async (prisma) => {
      // タスクの更新（すでにあるタスクはupdate、新規はcreate、既存から消えたものはdelete）
      const existingTaskIds = await prisma.task.findMany({
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
      await prisma.task.deleteMany({
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
            await prisma.task.update({
              where: { id: task.id },
              data: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
              },
            });
          } else {
            await prisma.task.create({
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
      await prisma.url.deleteMany({
        where: {
          scheduleId,
        },
      });
      await prisma.url.createMany({
        data: urls.map((url) => ({
          url: url.url,
          name: url.name,
          scheduleId,
        })),
      });

      // 予定を更新
      return await prisma.schedule.update({
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
    await flash("予定が更新されました！");
    redirect("/schedule/calendar");
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect("/auth/sign-in");
    }
    throw e;
  }
}
