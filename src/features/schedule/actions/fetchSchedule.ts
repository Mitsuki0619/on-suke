"use server";

import { auth } from "@/auth";
import { NotFoundException } from "@/errors";
import prisma from "@/lib/prisma";
import { convertNullsToUndefined } from "@/utils/convertNullsToUndefined";
import type { Schedule } from "@prisma/client";
import { AuthError } from "next-auth";
import { flash } from "@/utils/flash";

export async function fetchSchedule(scheduleId: Schedule["id"]) {
  const session = await auth();
  if (session?.user == null) {
    throw new AuthError();
  }

  try {
    const schedule = await prisma.schedule.findUnique({
      select: {
        title: true,
        description: true,
        categoryId: true,
        startTime: true,
        endTime: true,
        note: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
          },
        },
        urls: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
      where: {
        id: scheduleId,
        userId: session.user.id,
      },
    });
    if (schedule == null) {
      throw new NotFoundException("予定が見つかりませんでした");
    }
    return convertNullsToUndefined(schedule);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export type FetchScheduleReturnType = Awaited<ReturnType<typeof fetchSchedule>>;
