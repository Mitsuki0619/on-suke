"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { type ReactNode, useRef } from "react";

export default function ScheduleEventFormModal({
  children,
}: {
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
            <DialogTitle>予定の新規登録</DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
