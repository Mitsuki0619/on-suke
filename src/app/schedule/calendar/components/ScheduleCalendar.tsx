"use client";

import { SchedulerToolbar } from "@/app/schedule/calendar/components/ScheduleToolbar";
import { localizer } from "@/lib/date-fns";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar, type Event, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export function ScheduleCalendar({
  events,
  date,
  view,
}: {
  date: string | undefined;
  view: "month" | "week" | "day" | undefined;
  events: Event[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const validDate = date ? new Date(date) : new Date();
  const validView = view ?? "month";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };
  const onView = (selectedView: View) => {
    router.push(`${pathname}?${createQueryString("view", selectedView)}`);
  };

  const onNavigate = (newDate: Date) => {
    router.push(
      `${pathname}?${createQueryString("date", format(newDate, "yyyy-MM-dd"))}`,
    );
  };
  return (
    <Calendar
      date={validDate}
      view={validView}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 650 }}
      culture={"ja"}
      onNavigate={onNavigate}
      onView={onView}
      components={{ toolbar: (props) => <SchedulerToolbar {...props} /> }}
    />
  );
}
