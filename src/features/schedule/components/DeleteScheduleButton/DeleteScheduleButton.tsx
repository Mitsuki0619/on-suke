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
import { deleteSchedule } from "@/features/schedule/actions/deleteSchedule";
import { Trash } from "lucide-react";
import { useActionState, useState } from "react";

export function DeleteScheduleButton({ scheduleId }: { scheduleId: string }) {
  const [, action, isPending] = useActionState(async () => {
    await deleteSchedule(scheduleId);
  }, undefined);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <Trash />
          削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 rounded-lg sm:rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl font-bold">
            本当にこの予定を削除しますか？
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base mt-2">
            ※この操作は後で元に戻すことができます。この予定は一時的に削除され、後で復元することができます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-6">
          <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1">
            キャンセル
          </AlertDialogCancel>
          <form
            action={action}
            onSubmit={(e) => e.stopPropagation()}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
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
