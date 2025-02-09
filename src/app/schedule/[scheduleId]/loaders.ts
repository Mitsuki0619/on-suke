"use server";

import { auth } from "@/auth";
import { NotFoundException } from "@/errors";
import prisma from "@/lib/prisma";
import type { Schedule } from "@prisma/client";
import { AuthError } from "next-auth";

export async function fetchSchedule(scheduleId: Schedule["id"]) {
  const session = await auth();
  if (session?.user == null) {
    throw new AuthError();
  }

  const schedule = await prisma.schedule.findUnique({
    select: {
      title: true,
      description: true,
      categoryId: true,
      startTime: true,
      endTime: true,
      note: true,
      tasks: true,
      urls: true,
    },
    where: {
      id: scheduleId,
      userId: session.user.id,
    },
  });

  if (schedule == null) {
    throw new NotFoundException("予定が見つかりませんでした");
  }

  return schedule;
}

export type FetchScheduleReturnType = Awaited<ReturnType<typeof fetchSchedule>>;
