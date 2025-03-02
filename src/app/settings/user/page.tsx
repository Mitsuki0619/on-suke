import { UserSettingsPage } from "@/features/settings/components/UserSettingsPage/UserSettingsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "on-suke | ユーザー設定",
  description: "on-sukeとLINEの連携ができるユーザー設定ページ",
};

export const experimental_ppr = true;

export default function Index() {
  return <UserSettingsPage />;
}
