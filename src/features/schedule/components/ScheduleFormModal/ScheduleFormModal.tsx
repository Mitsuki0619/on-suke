"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useRef } from "react";

export function ScheduleFormModal({
  type,
  children,
}: {
  type: "add" | "edit";
  children: ReactNode;
}) {
  const { back } = useRouter();
  const open = useRef(true);

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        open.current = false;
      }}
    >
      <DialogContent
        onAnimationEnd={() => {
          if (!open.current) {
            back();
          }
        }}
        className="w-[95vw] max-w-4xl max-h-[75vh] lg:max-h-[90vh] overflow-auto p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl"
      >
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            {type === "add" ? (
              <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
            ) : (
              <Pencil className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
            )}
            {type === "add" ? "予定の登録" : "予定の編集"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base mt-1 sm:mt-2">
            {type === "add"
              ? "新しい予定を登録します。"
              : "既存の予定を編集します。"}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
