import type { Metadata } from "next";
import { SettingsMenuPage } from "@/features/settings/components/SettingsMenuPage/SettingsMenuPage";

export const metadata: Metadata = {
  title: "on-suke | 設定メニュー",
  description: "on-sukeの各種設定リンク一覧ページ",
};

export default function Index() {
  return <SettingsMenuPage />;
}
