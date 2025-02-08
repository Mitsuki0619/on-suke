import { ScheduleCalendar } from "@/app/schedule/calendar/components/ScheduleCalendar";
import { fetchSchedules } from "@/app/schedule/calendar/loaders";
import { searchParamsSchema } from "@/app/schedule/calendar/schemas";
import { Button } from "@/components/ui/button";
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
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface SearchParams {
  date?: string;
  view?: string;
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { date, view } = await searchParams;
  const { data, success, error } = searchParamsSchema.safeParse({ date, view });
  if (!success) {
    throw new Error(error.message);
  }
  const targetDate = data.date ? new Date(data.date) : new Date();
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">カレンダー</h1>
      <Button className="mb-4" asChild>
        <Link href={`/schedule/add?date=${date || ""}&view=${view || ""}`}>
          <PlusCircle />
          予定を追加
        </Link>
      </Button>
      <ScheduleCalendar
        date={data.date}
        view={data.view}
        schedules={schedules}
      />
    </div>
  );
}
