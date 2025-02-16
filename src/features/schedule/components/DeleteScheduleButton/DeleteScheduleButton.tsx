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

import { useActionState, useState } from "react";

export function DeleteScheduleButton({ scheduleId }: { scheduleId: string }) {
  const [, action, isPending] = useActionState(
    async () => deleteSchedule(scheduleId),
    undefined
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="">
          削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当にこの予定を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消すことができません。この予定に関連するすべてのデータが永久に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <form action={action} onSubmit={(e) => e.stopPropagation()}>
            <Button variant="destructive" type="submit" disabled={isPending}>
              削除する
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
