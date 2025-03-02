import RootLayout from "@/components/layout/RootLayout/RootLayout";
import "@/styles/calendar-custom.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { notoSansJp } from "../assets/fonts/notoSansJp";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "on-suke | ダッシュボード",
  description: "on-sukeのダッシュボードページ",
};

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <link rel="icon" href="/on-suke.svg" sizes="any" />
      <body className={`${inter.className} text-orange-950`}>
        <Providers>
          <RootLayout>
            {modal}
            {children}
          </RootLayout>
        </Providers>
      </body>
    </html>
  );
}
