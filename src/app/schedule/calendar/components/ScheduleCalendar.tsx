"use client";

import { SchedulerToolbar } from "@/app/schedule/calendar/components/ScheduleToolbar";
import type { FetchSchedulesReturnType } from "@/app/schedule/calendar/loaders";
import { localizer } from "@/lib/date-fns";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export function ScheduleCalendar({
  schedules,
  date,
  view,
}: {
  schedules: FetchSchedulesReturnType;
  date: string | undefined;
  view: "month" | "week" | "day" | undefined;
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
  const events = schedules?.map((s) => {
    return {
      title: s.title,
      start: s.startTime ? new Date(s.startTime) : undefined,
      end: s.endTime ? new Date(s.endTime) : undefined,
      existTasks: s.tasks.filter(
        (t) => t.status === "TODO" || t.status === "WIP",
      ).length,
      color: s.category?.color ?? "606060",
    };
  });
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
      eventPropGetter={(props) => ({
        style: {
          backgroundColor: `#${props.color}`,
          border: "none",
        },
        className: "w-full h-full relative",
      })}
      components={{
        toolbar: (props) => (
          <SchedulerToolbar
            label={props.label}
            onNavigate={props.onNavigate}
            onView={props.onView}
          />
        ),
        event: (props) => (
          <div>
            {!props.continuesPrior && props.event.existTasks > 0 && (
              <span
                className="absolute -top-2 -left-4 flex h-5 w-5 items-center justify-center 
              rounded-full bg-red-500 text-white text-xs font-bold"
              >
                {props.event.existTasks}
              </span>
            )}
            {props.title}
          </div>
        ),
      }}
    />
  );
}
