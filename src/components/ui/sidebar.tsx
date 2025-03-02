"use client";

import { usePathname } from "next/navigation";
import { AccountPopover } from "@/components/ui/account-popover";
import { Calendar, LayoutDashboard, Settings } from "lucide-react";
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
  { href: "/settings", slug: "settings", icon: Settings, label: "設定" },
];

export function Sidebar() {
  const session = useSession();
  const pathname = usePathname();

  const isAuth = session.data?.user && pathname !== "/auth/sign-in";

  const isActive = (item: (typeof navItems)[0]) =>
    (item.slug && pathname.includes(item.slug)) || pathname === item.href;

  return (
    <>
      {/* Sidebar - Only visible on desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-primary to-primary-dark text-white p-4 flex flex-col transition-transform duration-300 ease-in-out",
          "hidden md:flex", // Hide on mobile, show on desktop
        )}
      >
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
                    isActive(item)
                      ? "bg-white text-primary font-bold shadow-lg transform scale-105"
                      : "hover:bg-primary-light hover:text-yellow-300 hover:translate-x-2",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-6 w-6",
                      isActive(item) ? "animate-bounce" : "",
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

      {/* Bottom Navigation - Only visible on mobile */}
      {isAuth && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary text-white z-40 md:hidden">
          <nav className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-300 ease-in-out",
                  isActive(item)
                    ? "bg-primary-dark text-yellow-300 font-bold"
                    : "hover:bg-primary-light",
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6 mb-1",
                    isActive(item) ? "text-yellow-300" : "",
                  )}
                />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
            {/* Account button for mobile */}
            {session?.data?.user && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <AccountPopover user={session.data.user} isMobile />
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Main content padding for desktop and bottom padding for mobile */}
      <div className="md:pl-64 md:pb-0 transition-all duration-300">
        {/* Your page content goes here */}
      </div>
    </>
  );
}
