"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, type View, Views, type Event } from "react-big-calendar";
import { localizer } from "@/lib/date-fns";
import { SchedulerToolbar } from "@/app/schedule/calendar/components/ScheduleToolbar";
import { useState, useCallback } from "react";

export function ScheduleCalendar({ events }: { events: Event[] }) {
  const [view, setView] = useState<View>(Views.MONTH);

  const onView = (selectedView: View) => {
    setView(selectedView);
  };

  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback((newDate: Date) => {
    return setDate(newDate);
  }, []);
  return (
    <Calendar
      date={date}
      view={view}
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
