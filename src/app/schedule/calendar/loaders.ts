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
        AND: [
          {
            userId: session.user.id,
          },
        ],
        OR: [
          // 開始日と終了日が両方ある場合、範囲が対象月と重なる
          {
            startTime: { not: null },
            endTime: { not: null },
            AND: [
              { startTime: { lte: data.to } }, // 開始日が対象月の最終日以前
              { endTime: { gte: data.from } }, // 終了日が対象月の最初の日以降
            ],
          },
          // 開始日だけがある場合、その日が対象月内
          {
            endTime: null,
            startTime: { not: null, gte: data.from, lte: data.to },
          },
          // 終了日だけがある場合、その日が対象月内
          {
            startTime: null,
            endTime: { not: null, gte: data.from, lte: data.to },
          },
        ],
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
