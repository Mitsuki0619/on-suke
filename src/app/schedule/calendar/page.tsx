import {
  ScheduleCalendarPage,
  type ScheduleCalendarPageParams,
} from "@/features/schedule/components/ScheduleCalendarPage/ScheduleCalendarPage";

export default function Index({
  params,
}: { params: ScheduleCalendarPageParams }) {
  return <ScheduleCalendarPage params={params} />;
}
