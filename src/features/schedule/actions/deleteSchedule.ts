"use server";

import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";
import type { Schedule } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { flash } from "@/utils/flash";

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
    await flash({ title: "予定を削除しました！" });
    revalidatePath(`/schedule/${scheduleId}/edit`);
  } catch (e) {
    await flash({ title: "予定の削除に失敗しました。" });
  }
}
