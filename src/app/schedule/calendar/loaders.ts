"use server";

import { fetchSchedulesSchema } from "@/app/schedule/calendar/schemas";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

export async function fetchSchedules(params: { from: string; to: string }) {
  try {
    const session = await auth();
    if (session?.user == null) {
      throw new AuthError();
    }
    const parsedParams = fetchSchedulesSchema.safeParse(params);
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
        // AND: [
        //   {
        //     userId: session.user.id,
        //   },
        // ],
        // OR: [
        //   {
        //     startTime: { lte: data.to },
        //     endTime: { gte: data.from },
        //   },
        // ],
      },
    });
    return schedules;
  } catch (e) {
    if (e instanceof AuthError) {
      redirect("/login");
    }
  }
}

export type FetchSchedulesReturnType = Awaited<
  ReturnType<typeof fetchSchedules>
>;
