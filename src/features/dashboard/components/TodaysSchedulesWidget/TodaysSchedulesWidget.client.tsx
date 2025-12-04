"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FetchSchedulesManyReturnType } from "@/features/schedule/actions/fetchSchedulesMany";
import { localizer } from "@/lib/date-fns";
import { getContrastColor } from "@/utils/getContrastColor";

export function TodaysSchedulesWidgetClient({
  todaysSchedules,
}: {
  todaysSchedules: FetchSchedulesManyReturnType;
}) {
  const router = useRouter();
  const [validDate, setValidDate] = useState<Date | null>(null);

  useEffect(() => {
    setValidDate(new Date());
  }, []);

  const events = todaysSchedules?.map((s) => {
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

  const onSelectEvent = (event: NonNullable<typeof events>[number]) => {
    router.push(`/schedule/${event.id}/edit`);
  };

  if (!validDate) {
    return null;
  }

  return (
    <Card className="h-[562px] overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-amber-300 py-2 sticky top-0">
        <CardTitle className="text-2xl font-bold text-white">
          今日の予定
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-lg overflow-hidden">
          <Calendar
            date={validDate}
            localizer={localizer}
            view="day"
            views={["day"]}
            events={events}
            onSelectEvent={onSelectEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 480 }}
            culture="ja"
            eventPropGetter={(props) => ({
              style: {
                backgroundColor: props.color,
                border: "none",
                borderRadius: "6px",
                padding: "2px 8px",
                color: getContrastColor(props.color),
                fontWeight: "bold",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              },
              className: "w-full h-full relative",
            })}
            components={{
              toolbar: () => null,
              event: (props) => (
                <div className="flex items-center justify-between">
                  <span className="truncate">{props.title}</span>
                  {props.event.existTasks > 0 && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-pulse ml-1">
                      {props.event.existTasks}
                    </span>
                  )}
                </div>
              ),
            }}
            className="custom-calendar"
          />
        </div>
      </CardContent>
    </Card>
  );
}
