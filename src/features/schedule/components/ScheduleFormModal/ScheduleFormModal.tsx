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
    <>
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
          className="max-w-4xl max-h-[90vh] overflow-auto"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {type === "add" ? (
                <PlusCircle className="h-6 w-6 text-orange-500" />
              ) : (
                <Pencil className="h-6 w-6 text-orange-500" />
              )}
              {type === "add" ? "予定の登録" : "予定の編集"}
            </DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
