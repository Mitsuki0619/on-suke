import { CategoryMasterSettingsPage } from "@/features/settings/components/CategoryMasterSettingsPage/CategoryMasterSettingsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "on-suke | カテゴリ設定",
  description: "予定のカテゴリの登録・編集・削除ができる設定ページ",
};

export default function Index() {
  return <CategoryMasterSettingsPage />;
}
