"use client";

import { usePathname } from "next/navigation";
import { AccountPopover } from "@/components/ui/account-popover";
import { Calendar, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "ダッシュボード" },
  { href: "/schedule/calendar", icon: Calendar, label: "カレンダー" },
  // { href: "/tasks", icon: ListTodo, label: "タスク一覧" },
  // { href: "/settings", icon: Settings, label: "設定" },
];

export function Sidebar() {
  const session = useSession();

  const pathname = usePathname();

  return (
    <div className="w-64 bg-gradient-to-b from-primary to-primary-dark text-white h-full p-4 flex flex-col">
      <div className="text-3xl font-bold mb-8 text-center text-yellow-300 animate-pulse">
        on-suke
      </div>
      {session.data?.user && (
        <>
          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ease-in-out
                  ${
                    pathname === item.href
                      ? "bg-white text-primary font-bold shadow-lg transform scale-105"
                      : "hover:bg-primary-light hover:text-yellow-300 hover:translate-x-2"
                  }`}
              >
                <item.icon
                  className={`h-6 w-6 ${
                    pathname === item.href ? "animate-bounce" : ""
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          {session.data.user && <AccountPopover user={session.data.user} />}
        </>
      )}
    </div>
  );
}
