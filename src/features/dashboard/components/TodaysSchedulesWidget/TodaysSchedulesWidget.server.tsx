import { TodaysSchedulesWidgetClient } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.client";
import { fetchSchedulesMany } from "@/features/schedule/actions/fetchSchedulesMany";
import { endOfToday, startOfToday } from "date-fns";

export async function TodaysSchedulesWidget() {
  const todaysSchedules = await fetchSchedulesMany({
    from: startOfToday().toISOString(),
    to: endOfToday().toISOString(),
  });

  return <TodaysSchedulesWidgetClient todaysSchedules={todaysSchedules} />;
}
