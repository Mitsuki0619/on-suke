import { Sidebar } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react"; // Added import for React
import "./globals.css";
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
            <main className="flex-1 overflow-y-auto p-8 bg-main-background">
              <div className="max-w-7xl">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
