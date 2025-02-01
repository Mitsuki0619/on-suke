import { auth } from "@/auth";
import { AccountPopover } from "@/components/ui/account-popover";
import {
  Calendar,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import Link from "next/link";

export async function Sidebar() {
  const session = await auth();

  return (
    <div className="w-64 bg-sidebar text-white h-full p-4 flex flex-col">
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
          {session.user && <AccountPopover user={session.user} />}
        </>
      )}
    </div>
  );
}
