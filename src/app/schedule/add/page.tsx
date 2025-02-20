import { AddSchedulePage } from "@/features/schedule/components/AddSchedulePage/AddSchedulePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "on-suke | 予定の新規登録",
  description: "予定の新規登録ができるページ",
};

export default function Index() {
  return <AddSchedulePage />;
}
