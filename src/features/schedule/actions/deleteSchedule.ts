"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import type { Schedule } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteSchedule(scheduleId: Schedule["id"]) {
  const { user } = await checkAuth();
  try {
    await prisma.schedule.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        id: scheduleId,
        userId: user.id,
      },
    });
    revalidatePath(`/schedule/${scheduleId}/edit`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
