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

export async function ScheduleCalendar({
  date,
  view,
}: {
  date: string | undefined;
  view: "month" | "week" | "day" | undefined;
}) {
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
