import {
  EditSchedulePage,
  type EditSchedulePageParams,
} from "@/features/schedule/components/EditSchedulePage/EditSchedulePage";

export default function Index({ params }: { params: EditSchedulePageParams }) {
  return <EditSchedulePage params={params} />;
}
