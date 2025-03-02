import { fetchSchedulesMany } from "@/features/schedule/actions/fetchSchedulesMany";
import { ScheduleCalendarClient } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.client";
import {
  endOfMonth,
  endOfWeek,
  formatISO,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  searchParamsSchema,
  type ScheduleCalendarPageSearchParams,
} from "@/features/schedule/components/ScheduleCalendarPage/ScheduleCalendarPage";

export async function ScheduleCalendar({
  searchParams,
}: {
  searchParams: ScheduleCalendarPageSearchParams;
}) {
  const params = await searchParams;

  const { data, success, error } = searchParamsSchema.safeParse({ ...params });
  if (!success) {
    throw new Error(error.message);
  }
  const { date, view } = data;

  const targetDate = date ? new Date(date) : new Date();
  const startOfPeriod =
    view === "month"
      ? startOfMonth(targetDate)
      : view === "week"
        ? startOfWeek(targetDate)
        : view === "day"
          ? new Date(targetDate)
          : startOfMonth(targetDate); // default to month if view is not specified
  const endOfPeriod =
    view === "month"
      ? endOfMonth(targetDate)
      : view === "week"
        ? endOfWeek(targetDate)
        : view === "day"
          ? new Date(targetDate)
          : endOfMonth(targetDate); // default to month if view is not specified

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
