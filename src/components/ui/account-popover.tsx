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
import type { User as AuthUser } from "next-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  user: AuthUser;
  isMobile?: boolean;
}

export function AccountPopover({ user, isMobile = false }: Props) {
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-full w-full",
              "hover:bg-primary-light",
            )}
          >
            <Avatar className="h-6 w-6 mb-1">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name ? `Avatar of ${user.name}` : "User avatar"}
              />
              <AvatarFallback className="bg-primary-dark text-white text-xs">
                {user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">アカウント</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 bg-white p-2" align="center" side="top">
          <div className="space-y-1">
            <div className="p-2 text-center border-b mb-2">
              <Avatar className="h-12 w-12 mx-auto mb-2">
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name ? `Avatar of ${user.name}` : "User avatar"}
                />
                <AvatarFallback className="bg-primary-dark text-white">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
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
    );
  }

  return (
    <div className="mt-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-primary-light text-white"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name ? `Avatar of ${user.name}` : "User avatar"}
              />
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
