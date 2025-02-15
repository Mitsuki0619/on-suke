import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ScheduleCalendarClient } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.client";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar/ScheduleCalendar.server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { z } from "zod";

export type ScheduleCalendarPageParams = Promise<{
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

export async function ScheduleCalendarPage({
  params,
}: {
  params: ScheduleCalendarPageParams;
}) {
  const { date, view } = await params;
  const { data, success, error } = searchParamsSchema.safeParse({ date, view });
  if (!success) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">カレンダー</h1>
      <Button className="mb-4" asChild>
        <Link href={`/schedule/add?date=${date || ""}&view=${view || ""}`}>
          <PlusCircle />
          予定を追加
        </Link>
      </Button>
      <Suspense
        fallback={
          <LoadingOverlay isLoading message="Loading...">
            <ScheduleCalendarClient
              schedules={[]}
              date={data.date}
              view={data.view}
            />
          </LoadingOverlay>
        }
      >
        <ScheduleCalendar date={data.date} view={data.view} />
      </Suspense>
    </div>
  );
}
