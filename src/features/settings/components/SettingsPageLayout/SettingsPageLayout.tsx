"use client";

import { Card } from "@/components/ui/card";
import { Grid2X2, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SettingsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navItems = [
    {
      href: "/settings/user",
      label: "ユーザー設定",
      icon: User,
    },
    {
      href: "/settings/master/category",
      label: "カテゴリ設定",
      icon: Grid2X2,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl sm:px-4">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-orange-950">設定</h1>
      </div>

      <Card className="overflow-hidden border-none bg-white/80 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row h-auto sm:h-full sm:min-h-[600px]">
          {/* モバイル用タブメニュー */}
          <nav className="flex sm:hidden flex-wrap gap-2 p-4 bg-orange-50/50 border-b border-orange-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 p-2 text-orange-950 text-sm hover:bg-orange-100 hover:text-orange-900 rounded-md transition-colors flex-grow justify-center ${
                  item.href === pathname ? "bg-orange-100 text-orange-900" : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* PC用サイドバー */}
          <nav className="hidden sm:flex min-h-full w-64 flex-col items-stretch justify-start space-y-2 bg-orange-50/50 p-4 border-r border-orange-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 p-3 text-orange-950 text-left hover:bg-orange-100 hover:text-orange-900 rounded-md transition-colors ${
                  item.href === pathname ? "bg-orange-100 text-orange-900" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <main className="flex-1 p-4 sm:p-6 overflow-auto min-h-[600px]">
            {children}
          </main>
        </div>
      </Card>
    </div>
  );
}
