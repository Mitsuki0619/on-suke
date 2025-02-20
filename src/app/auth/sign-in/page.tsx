import { SignInPage } from "@/features/auth/components/SignInPage/SignInPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "on-suke | ログイン",
  description: "on-sukeのログイン画面",
};

export default function Index() {
  return <SignInPage />;
}
