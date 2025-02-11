import { TodayScheduleClient } from "@/app/dashboard/components/TodaysSchedules/TodaysSchedules.client";
import { fetchSchedules } from "@/app/schedule/calendar/loaders";
import { endOfToday, startOfToday } from "date-fns";

export async function TodaySchedule() {
  const todaysSchedules = await fetchSchedules({
    from: startOfToday().toISOString(),
    to: endOfToday().toISOString(),
  });

  return <TodayScheduleClient todaysSchedules={todaysSchedules} />;
}
