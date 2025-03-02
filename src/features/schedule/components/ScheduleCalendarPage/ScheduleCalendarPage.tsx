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
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-950">カレンダー</h1>
      </div>
      <Button className="mb-4" asChild>
        <Link href="/schedule/add">
          <PlusCircle />
          予定を追加
        </Link>
      </Button>
      <Suspense
        fallback={
          <LoadingOverlay isLoading message="Loading...">
            <ScheduleCalendarClient schedules={[]} date="" view="month" />
          </LoadingOverlay>
        }
      >
        <ScheduleCalendar searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
