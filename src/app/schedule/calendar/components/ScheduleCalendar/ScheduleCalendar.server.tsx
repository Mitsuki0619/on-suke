import { fetchSchedules } from "@/app/schedule/calendar/loaders";
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
import { ScheduleCalendarClient } from "@/app/schedule/calendar/components/ScheduleCalendar/ScheduleCalendar.client";

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

  const schedules = await fetchSchedules({
    from: startOfMonthISO,
    to: endOfMonthISO,
  });

  return (
    <ScheduleCalendarClient schedules={schedules} date={date} view={view} />
  );
}
