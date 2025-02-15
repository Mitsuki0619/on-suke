import {
  ScheduleCalendarPage,
  type ScheduleCalendarPageSearchParams,
} from "@/features/schedule/components/ScheduleCalendarPage/ScheduleCalendarPage";

export default function Index({
  searchParams,
}: { searchParams: ScheduleCalendarPageSearchParams }) {
  return <ScheduleCalendarPage searchParams={searchParams} />;
}
