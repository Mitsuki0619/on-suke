import SettingsPageLayout from "@/features/settings/components/SettingsPageLayout/SettingsPageLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <SettingsPageLayout>{children}</SettingsPageLayout>;
}
