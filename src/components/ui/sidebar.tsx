import { auth } from "@/auth";
import { AccountPopover } from "@/components/ui/account-popover";
import {
  Calendar,
  LayoutDashboard,
  ListTodo,
  Settings,
} from "lucide-react";
import Link from "next/link";

export async function Sidebar() {
  const session = await auth();

  return (
    <div className="w-64 bg-primary text-white h-full p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">on-suke</div>
      {session?.user && (
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
              href="/schedule/calendar"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span>カレンダー</span>
            </Link>
            <Link
              href="/tasks"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <ListTodo className="h-5 w-5" />
              <span>タスク一覧</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 p-2 rounded hover:bg-sidebar-hover transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>設定</span>
            </Link>
          </nav>
          {session.user && <AccountPopover user={session.user} />}
        </>
      )}
    </div>
  );
}
