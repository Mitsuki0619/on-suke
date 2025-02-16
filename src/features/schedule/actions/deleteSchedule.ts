"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import type { Schedule } from "@prisma/client";

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
    await flash({ title: "予定を削除しました!" });
  } catch (e) {
    await flash({ title: "予定の削除中にエラーが発生しました。" });
    throw e;
  }
}
