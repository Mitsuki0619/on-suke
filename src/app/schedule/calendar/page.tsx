import type { Metadata } from "next";
import {
  ScheduleCalendarPage,
  type ScheduleCalendarPageSearchParams,
} from "@/features/schedule/components/ScheduleCalendarPage/ScheduleCalendarPage";

export const metadata: Metadata = {
  title: "on-suke | 予定表",
  description: "カレンダーで予定が確認できるページ",
};

export default function Index({
  searchParams,
}: {
  searchParams: ScheduleCalendarPageSearchParams;
}) {
  return <ScheduleCalendarPage searchParams={searchParams} />;
}
