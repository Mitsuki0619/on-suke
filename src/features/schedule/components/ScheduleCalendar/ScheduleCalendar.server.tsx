import {
  addDays,
  endOfMonth,
  endOfWeek,
  formatISO,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { connection } from "next/server";
import { fetchSchedulesMany } from "@/features/schedule/actions/fetchSchedulesMany";
import { ScheduleCalendarClient } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.client";
import {
  type ScheduleCalendarPageSearchParams,
  searchParamsSchema,
} from "@/features/schedule/components/ScheduleCalendarPage/ScheduleCalendarPage";

export async function ScheduleCalendar({
  searchParams,
}: {
  searchParams: ScheduleCalendarPageSearchParams;
}) {
  await connection();

  const params = await searchParams;

  const { data, success, error } = searchParamsSchema.safeParse({ ...params });
  if (!success) {
    throw new Error(error.message);
  }
  const { date, view } = data;

  const targetDate = date ? new Date(date) : new Date();
  const startOfPeriod =
    view === "month"
      ? subDays(startOfMonth(targetDate), 7)
      : view === "week"
        ? startOfWeek(targetDate)
        : view === "day"
          ? new Date(targetDate)
          : subDays(startOfMonth(targetDate), 7); // default to month if view is not specified
  const endOfPeriod =
    view === "month"
      ? addDays(endOfMonth(targetDate), 7)
      : view === "week"
        ? endOfWeek(targetDate)
        : view === "day"
          ? new Date(targetDate)
          : addDays(endOfMonth(targetDate), 7); // default to month if view is not specified

  const startOfMonthISO = formatISO(
    setMilliseconds(
      setSeconds(setMinutes(setHours(startOfPeriod, 0), 0), 0),
      0,
    ),
  );
  const endOfMonthISO = formatISO(
    setMilliseconds(
      setSeconds(setMinutes(setHours(endOfPeriod, 23), 59), 59),
      999,
    ),
  );

  const schedules = await fetchSchedulesMany({
    from: startOfMonthISO,
    to: endOfMonthISO,
  });

  return (
    <ScheduleCalendarClient schedules={schedules} date={date} view={view} />
  );
}
