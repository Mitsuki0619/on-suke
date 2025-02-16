"use server";

import prisma from "@/lib/prisma";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import type { User } from "next-auth";
import "server-only";

export async function fetchSchedulesManyForNotification(userId: User["id"]) {
  const timeZone = "Asia/Tokyo";
  const nowInJapan = toDate(new Date(), { timeZone });

  const tomorrowStart = startOfDay(addDays(nowInJapan, 1));
  const tomorrowEnd = endOfDay(tomorrowStart);

  const tomorrowStartISO = formatInTimeZone(
    tomorrowStart,
    timeZone,
    "yyyy-MM-dd'T'HH:mm:ssXXX",
  );
  const tomorrowEndISO = formatInTimeZone(
    tomorrowEnd,
    timeZone,
    "yyyy-MM-dd'T'HH:mm:ssXXX",
  );

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
