"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { restoreSchedule } from "@/features/schedule/actions/restoreSchedule";
import { useActionState, useState } from "react";

export function RestoreScheduleButton({ scheduleId }: { scheduleId: string }) {
  const [, action, isPending] = useActionState(async () => {
    restoreSchedule(scheduleId);
  }, undefined);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">復元</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>この予定を復元しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <form action={action} onSubmit={(e) => e.stopPropagation()}>
            <Button variant="default" type="submit" disabled={isPending}>
              復元する
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
