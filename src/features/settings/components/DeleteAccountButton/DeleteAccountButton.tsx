"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/features/settings/actions/deleteUser";

import { useActionState, useState } from "react";

export function DeleteAccountButton() {
  const [, action, isPending] = useActionState(deleteUser, undefined);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          アカウントを削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 rounded-lg sm:rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
            本当にアカウントを削除しますか？
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base">
            この操作は取り消すことができません。アカウントに関連するすべてのデータが永久に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
          <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1">
            キャンセル
          </AlertDialogCancel>
          <form action={action} className="w-full sm:w-auto order-1 sm:order-2">
            <Button
              variant="destructive"
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              削除する
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
