"use server";

import { auth } from "@/auth";
import { fetchSchedulesManySchema } from "@/features/schedule/schemas/fetchSchedulesManySchema";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import "server-only";

export async function fetchSchedulesMany(params: { from: string; to: string }) {
  try {
    const session = await auth();
    if (session?.user == null) {
      throw new AuthError();
    }
    const parsedParams = fetchSchedulesManySchema.safeParse(params);
    const { data, success } = parsedParams;

    if (data == null || !success) {
      throw new Error();
    }

    const schedules = await prisma.schedule.findMany({
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        tasks: {
          select: {
            title: true,
            description: true,
            status: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      where: {
        userId: session.user.id,
        startTime: { lte: data.to },
        endTime: { gte: data.from },
        deleted_at: null,
      },
    });
    return schedules;
  } catch (_e) {}
}

export type FetchSchedulesManyReturnType = Awaited<
  ReturnType<typeof fetchSchedulesMany>
>;
