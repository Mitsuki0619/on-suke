"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import type { Schedule } from "@prisma/client";

export async function restoreSchedule(scheduleId: Schedule["id"]) {
  const { user } = await checkAuth();
  try {
    await prisma.schedule.update({
      data: {
        deleted_at: null,
      },
      where: {
        id: scheduleId,
        userId: user.id,
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
