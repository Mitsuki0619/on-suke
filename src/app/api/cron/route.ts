"use server";

import { fetchLineConnectedUsers } from "@/features/notification/actions/fetchLineConnectedUsers";
import { fetchSchedulesManyForNotification } from "@/features/notification/actions/fetchSchedulesManyForNotification";
import { sendScheduleMessage } from "@/features/notification/actions/sendScheduleMessage";
import { NextResponse } from "next/server";

export async function GET() {
  const lineConnectedUsers = await fetchLineConnectedUsers();
  await Promise.all(
    lineConnectedUsers.map(async (user) => {
      const schedules = await fetchSchedulesManyForNotification(user.id);
      await sendScheduleMessage(user.lineUserId, schedules);
    })
  );
  return NextResponse.json({ ok: true });
}
