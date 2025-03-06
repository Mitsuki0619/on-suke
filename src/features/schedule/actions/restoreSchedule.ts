"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import type { Schedule } from "@prisma/client";
import { flash } from "@/utils/flash";

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
    await flash({ title: "予定を復元しました！" });
  } catch (e) {
    await flash({ title: "予定の復元に失敗しました。" });
  }
}
