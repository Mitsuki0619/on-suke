import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ScheduleCalendarClient } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.client";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.server";
import { Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { z } from "zod";

export type ScheduleCalendarPageSearchParams = Promise<{
  date?: string;
  view?: string;
}>;

export const searchParamsSchema = z.object({
  date: z.string().date().optional(),
  view: z
    .string()
    .optional()
    .refine(
      (data) => {
        return (
          data === "month" || data === "week" || data === "day" || data == null
        );
      },
      {
        message: "無効なパラメータです",
      },
    ),
});

export const experimental_ppr = true;

export function ScheduleCalendarPage({
  searchParams,
}: {
  searchParams: ScheduleCalendarPageSearchParams;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
          <h1 className="text-xl sm:text-2xl font-bold text-orange-950">
            カレンダー
          </h1>
        </div>
        <Button className="w-full sm:w-auto" asChild>
          <Link
            href="/schedule/add"
            className="flex items-center justify-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>予定を追加</span>
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <LoadingOverlay isLoading message="Loading...">
            <ScheduleCalendarClient schedules={[]} date="" view="month" />
          </LoadingOverlay>
        }
      >
        <div className="overflow-x-auto">
          <div className="min-w-full sm:min-w-0">
            <ScheduleCalendar searchParams={searchParams} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
