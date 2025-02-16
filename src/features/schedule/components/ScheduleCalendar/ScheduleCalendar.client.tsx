"use client";

import type { FetchSchedulesManyReturnType } from "@/features/schedule/actions/fetchSchedulesMany";
import { ScheduleCalendarToolBar } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendarToolBar";
import { localizer } from "@/lib/date-fns";
import { getContrastColor } from "@/utils/getContrastColor";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export function ScheduleCalendarClient({
  schedules,
  date,
  view,
}: {
  schedules: FetchSchedulesManyReturnType;
  date: string | undefined;
  view: "month" | "week" | "day" | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const validDate = date ? new Date(date) : new Date();
  const validView = view ?? "month";
  const events = schedules?.map((s) => {
    return {
      id: s.id,
      title: s.title,
      start: s.startTime ? new Date(s.startTime) : undefined,
      end: s.endTime ? new Date(s.endTime) : undefined,
      existTasks: s.tasks.filter(
        (t) => t.status === "TODO" || t.status === "WIP",
      ).length,
      color: s.category?.color ?? "#606060",
    };
  });

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
  const onSelectEvent = (event: NonNullable<typeof events>[number]) => {
    router.push(
      `/schedule/${event.id}/edit?date=${date || ""}&view=${view || ""}`,
    );
  };

  return (
    <div className="calendar-wrapper p-4 bg-gradient-to-br from-theme-orange-100 to-theme-orange-200 rounded-lg shadow-lg">
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
        onSelectEvent={onSelectEvent}
        eventPropGetter={(props) => ({
          style: {
            backgroundColor: props.color,
            border: "none",
            borderRadius: "8px",
            padding: "4px 8px",
            color: getContrastColor(props.color),
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          },
          className: "w-full h-full relative hover:transform hover:scale-105",
        })}
        components={{
          toolbar: (props) => (
            <ScheduleCalendarToolBar
              label={props.label}
              onNavigate={props.onNavigate}
              onView={props.onView}
              view={props.view}
            />
          ),
          event: (props) => (
            <div className="flex items-center justify-between">
              <span>{props.title}</span>
              {props.event.existTasks > 0 && (
                <span className="flex h-6 w-6 items-center justify-center z-10 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                  {props.event.existTasks}
                </span>
              )}
            </div>
          ),
          showMore: (props) => {
            return (
              <Link
                href={`${pathname}?date=${format(
                  props.slotDate,
                  "yyyy-MM-dd",
                )}&view=day`}
                className="text-sm text-theme-orange-600 font-bold hover:text-theme-orange-800 transition-colors duration-200"
              >
                +{props.count}つの予定
              </Link>
            );
          },
        }}
        className="custom-calendar"
      />
    </div>
  );
}
