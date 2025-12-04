import { endOfToday, startOfToday } from "date-fns";
import { connection } from "next/server";
import { TodaysSchedulesWidgetClient } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.client";
import { fetchSchedulesMany } from "@/features/schedule/actions/fetchSchedulesMany";

export async function TodaysSchedulesWidget() {
  await connection();

  const todaysSchedules = await fetchSchedulesMany({
    from: startOfToday().toISOString(),
    to: endOfToday().toISOString(),
  });

  return <TodaysSchedulesWidgetClient todaysSchedules={todaysSchedules} />;
}
