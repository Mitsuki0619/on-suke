"use client";

import { usePathname } from "next/navigation";
import { AccountPopover } from "@/components/ui/account-popover";
import { Calendar, LayoutDashboard, ListTodo, Settings } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "ダッシュボード" },
  {
    href: "/schedule/calendar",
    slug: "schedule",
    icon: Calendar,
    label: "予定表",
  },
  // { href: "/tasks", icon: ListTodo, label: "タスク一覧" },
  { href: "/settings", slug: "settings", icon: Settings, label: "設定" },
];

export function Sidebar() {
  const session = useSession();
  const pathname = usePathname();

  const isAuth = session.data?.user && pathname !== "/auth/sign-in";

  return (
    <div className="w-64 bg-gradient-to-b from-primary to-primary-dark text-white h-full p-4 flex flex-col">
      <div className="text-3xl font-bold mb-8 text-center text-yellow-300 animate-pulse">
        on-suke
      </div>
      {isAuth && (
        <>
          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ease-in-out",
                  (item.slug && pathname.includes(item.slug)) ||
                    pathname === item.href
                    ? "bg-white text-primary font-bold shadow-lg transform scale-105"
                    : "hover:bg-primary-light hover:text-yellow-300 hover:translate-x-2",
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    (item.slug && pathname.includes(item.slug)) ||
                      pathname === item.href
                      ? "animate-bounce"
                      : "",
                  )}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          {session?.data?.user && isAuth && (
            <AccountPopover user={session.data.user} />
          )}
        </>
      )}
    </div>
  );
}
