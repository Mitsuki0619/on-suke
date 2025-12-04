"use server";

import { TIME_ZONE } from "@/const/config";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import { addDays, endOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export async function fetchRecentlyTasks() {
  const { user } = await checkAuth();
  const nowInJapan = toZonedTime(new Date(), TIME_ZONE);

  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        schedule: {
          select: {
            id: true,
            title: true,
          },
        },
        endTime: true,
      },
      where: {
        userId: user.id,
        status: {
          in: ["TODO", "WIP"],
        },
        schedule: {
          deleted_at: null,
        },
        endTime: {
          lte: endOfDay(addDays(nowInJapan, 3)),
          not: null,
        },
      },
    });

    const todayDeadlineTasks = tasks.filter((task) => {
      if (task.endTime == null) {
        return false;
      }
      const endOfToday = endOfDay(nowInJapan);
      return task.endTime > nowInJapan && task.endTime <= endOfToday;
    });

    const tomorrowDeadlineTasks = tasks.filter((task) => {
      if (task.endTime == null) {
        return false;
      }
      const endOfTomorrow = endOfDay(addDays(nowInJapan, 1));
      return (
        task.endTime > endOfDay(nowInJapan) && task.endTime <= endOfTomorrow
      );
    });

    const expiredTasks = tasks.filter((task) => {
      if (task.endTime == null) {
        return false;
      }
      const endOfYesterday = endOfDay(addDays(nowInJapan, -1));
      return task.endTime <= endOfYesterday;
    });

    const otherTasks = tasks.filter((task) => {
      if (task.endTime == null) {
        return false;
      }
      const endOfDayAfterTomorrow = endOfDay(addDays(nowInJapan, 2));
      return task.endTime > endOfDayAfterTomorrow;
    });

    return {
      todayDeadlineTasks,
      tomorrowDeadlineTasks,
      expiredTasks,
      otherTasks,
    };
  } catch (_e) {}
}

export type FetchRecentlyTasksReturnType = Awaited<
  ReturnType<typeof fetchRecentlyTasks>
>;
