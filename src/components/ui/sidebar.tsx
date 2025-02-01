"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="w-64 bg-sidebar text-white h-full p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">on-suke</div>
      {status === "authenticated" && (
        <>
          <nav className="space-y-2 flex-grow">
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>ダッシュボード</span>
            </Link>
            <Link
              href="/calendar"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span>カレンダー（共通）</span>
            </Link>
            <Link
              href="/add-calendar"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>カレンダーを追加</span>
            </Link>
          </nav>
          <div className="mt-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-sidebar-hover"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {session.user?.name}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      設定
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    ログアウト
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </div>
  );
}
