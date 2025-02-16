"use server";

import type { FetchSchedulesManyForNotificationReturnType } from "@/features/notification/actions/fetchSchedulesManyForNotification";
import lineMessagingApiClient from "@/lib/line-bot-sdk";
import {
  addDays,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
} from "date-fns";
import { toDate } from "date-fns-tz";
import { ja } from "date-fns/locale";

export async function sendScheduleMessage(
  lineUserId: string,
  schedules: FetchSchedulesManyForNotificationReturnType,
) {
  const noticeMessage = formatMessage(schedules);

  try {
    // LINEにメッセージを送信
    await lineMessagingApiClient.pushMessage({
      to: lineUserId,
      messages: [
        {
          type: "text",
          text: noticeMessage,
        },
      ],
    });
    console.log("Message sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

function formatMessage(schedules: FetchSchedulesManyForNotificationReturnType) {
  const timeZone = "Asia/Tokyo";
  const nowInJapan = toDate(new Date(), { timeZone });

  const tomorrowStart = startOfDay(addDays(nowInJapan, 1));
  const tomorrowEnd = endOfDay(tomorrowStart);
  const dayAfterTomorrowStart = startOfDay(addDays(nowInJapan, 2));

  const formatTime = (date: Date) => format(date, "HH:mm");

  const getTimeString = (startTime: Date, endTime: Date) => {
    const timePatterns = {
      allDay:
        isBefore(startTime, tomorrowStart) &&
        isAfter(endTime, dayAfterTomorrowStart),
      startOnly:
        isAfter(startTime, tomorrowStart) &&
        isAfter(endTime, dayAfterTomorrowStart),
      endOnly:
        isBefore(startTime, tomorrowStart) && isBefore(endTime, tomorrowEnd),
      regular:
        isAfter(startTime, tomorrowStart) &&
        isBefore(endTime, dayAfterTomorrowStart),
    };

    const timeStrings = {
      allDay: "終日",
      startOnly: `${formatTime(startTime)} ~`,
      endOnly: `~ ${formatTime(endTime)}`,
      regular: `${formatTime(startTime)} ~ ${formatTime(endTime)}`,
    };

    return Object.keys(timePatterns).find(
      (key) => timePatterns[key as keyof typeof timePatterns],
    )
      ? timeStrings[
          Object.keys(timePatterns).find(
            (key) => timePatterns[key as keyof typeof timePatterns],
          ) as keyof typeof timeStrings
        ]
      : timeStrings.regular;
  };

  const formatSchedule = (
    s: FetchSchedulesManyForNotificationReturnType[number],
  ) => {
    const startTime = toDate(s.startTime, { timeZone });
    const endTime = toDate(s.endTime, { timeZone });
    const timeStr = getTimeString(startTime, endTime);
    return `- ${timeStr} : ${s.title}（未完了のタスク${s.tasks.length}件）`;
  };

  const isRegularSchedule = (startTime: Date, endTime: Date) =>
    isAfter(startTime, tomorrowStart) &&
    isBefore(endTime, dayAfterTomorrowStart);

  const { regularSchedules, longTermSchedules } = schedules.reduce(
    (acc, s) => {
      const startTime = toDate(s.startTime, { timeZone });
      const endTime = toDate(s.endTime, { timeZone });
      const category = isRegularSchedule(startTime, endTime)
        ? "regularSchedules"
        : "longTermSchedules";
      return {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...acc,
        [category]: [...acc[category], formatSchedule(s)],
      };
    },
    { regularSchedules: [], longTermSchedules: [] },
  );

  const tomorrowDateStr = format(tomorrowStart, "yyyy/MM/dd EEEE", {
    locale: ja,
  });
  const noticeMessage = `■ 明日（${tomorrowDateStr}）の予定
  ${regularSchedules.join("\n")}

  ${
    longTermSchedules.length > 0
      ? `■ 長期進行の予定
  ${longTermSchedules.join("\n")}
  `
      : ""
  }
  `.trim();

  return noticeMessage;
}
