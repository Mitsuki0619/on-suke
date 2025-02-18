"use server";

import { TIME_ZONE } from "@/const/config";
import prisma from "@/lib/prisma";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import type { User } from "next-auth";
import "server-only";

export async function fetchSchedulesManyForNotification(userId: User["id"]) {
  const nowInJapan = toZonedTime(new Date(), TIME_ZONE);

  const tomorrowStart = startOfDay(addDays(nowInJapan, 1));
  const tomorrowEnd = endOfDay(tomorrowStart);

  const tomorrowStartISO = format(tomorrowStart, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: TIME_ZONE,
  });
  const tomorrowEndISO = format(tomorrowEnd, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: TIME_ZONE,
  });

  const schedules = await prisma.schedule.findMany({
    select: {
      id: true,
      title: true,
      tasks: {
        select: {
          id: true,
        },
        where: {
          status: {
            in: ["TODO", "WIP"],
          },
        },
      },
      startTime: true,
      endTime: true,
    },
    where: {
      AND: [
        { startTime: { lte: tomorrowEndISO } },
        { endTime: { gte: tomorrowStartISO } },
      ],
      deleted_at: null,
      userId,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return schedules;
}

export type FetchSchedulesManyForNotificationReturnType = Awaited<
  ReturnType<typeof fetchSchedulesManyForNotification>
>;
