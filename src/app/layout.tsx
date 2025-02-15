import { FlashMessage } from "@/components/functional/FlashMessage/flash-message.server";
import RootLayout from "@/components/layout/RootLayout/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/calendar-custom.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { notoSansJp } from "../assets/fonts/notoSansJp";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar App",
  description: "A simple calendar application",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body className={inter.className}>
        <Providers>
          <RootLayout>{children}</RootLayout>
          <FlashMessage />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
