"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/features/auth/actions/logout";
import { PopoverClose } from "@radix-ui/react-popover";
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
            className="w-full justify-start hover:bg-primary/20 hover:text-white text-black/50"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="bg-primary-dark text-white">
                {user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="truncate font-medium">{user?.name}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 bg-white p-2">
          <div className="space-y-1">
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                asChild
              >
                <Link href="/settings/user">
                  <Settings className="mr-2 h-4 w-4" />
                  設定
                </Link>
              </Button>
            </PopoverClose>
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
