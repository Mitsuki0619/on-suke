import { ScheduleCalendar } from "@/app/schedule/calendar/components/ScheduleCalendar/ScheduleCalendar.server";
import { searchParamsSchema } from "@/app/schedule/calendar/schemas";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ScheduleCalendarClient } from "@/app/schedule/calendar/components/ScheduleCalendar/ScheduleCalendar.client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
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
