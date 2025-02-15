"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/features/auth/actions/logout";
import { LogOut, Settings } from "lucide-react";
import type { User } from "next-auth";
import Link from "next/link";
interface Props {
  user: User;
}

export function AccountPopover({ user }: Props) {
  return (
    <div className="mt-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-sidebar-hover hover:text-inherit"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            {user?.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                設定
              </Link>
            </Button>
            <form className="w-full" action={logout}>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                type="submit"
              >
                <LogOut className="mr-2 h-4 w-4" />
                サインアウト
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
