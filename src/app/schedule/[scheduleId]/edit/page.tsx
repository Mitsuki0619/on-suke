import {
  EditSchedulePage,
  type EditSchedulePageParams,
} from "@/features/schedule/components/EditSchedulePage/EditSchedulePage";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "on-suke | 予定の編集・削除",
  description: "予定の編集・削除ができるページ",
};

export default function Index({ params }: { params: EditSchedulePageParams }) {
  return <EditSchedulePage params={params} />;
}
