import { Sidebar } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import "@/styles/calendar-custom.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FlashMessage } from "@/components/functional/FlashMessage/flash-message.server";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { notoSansJp } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar App",
  description: "A simple calendar application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-100 dark:from-orange-900 dark:via-orange-800 dark:to-yellow-900 transition-colors duration-500">
              <div className="relative min-h-full p-8">
                {/* 背景のアニメーションされた要素 */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <div className="floating-element floating-1"></div>
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <div className="floating-element floating-2"></div>
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <div className="floating-element floating-3"></div>
                </div>

                {/* コンテンツコンテナ */}
                <div className="relative z-10 max-w-7xl w-full mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl border border-orange-200 dark:border-orange-700">
                  <div className="animate-fadeIn">{children}</div>
                </div>
              </div>
            </main>
            <FlashMessage />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
