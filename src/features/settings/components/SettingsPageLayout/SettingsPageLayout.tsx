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
    <div>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-orange-950">設定</h1>
        </div>

        <Card className="overflow-hidden border-none bg-white/80 shadow-lg backdrop-blur-sm">
          <div className="flex h-[600px]">
            <nav className="h-full w-64 flex-col items-stretch justify-start space-y-2 bg-orange-50/50 p-4 border-r border-orange-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 p-3 text-orange-950 text-left hover:bg-orange-100 hover:text-orange-900 rounded-md transition-colors ${
                    item.href === pathname && "bg-orange-100 text-orange-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </Card>
      </div>
    </div>
  );
}
