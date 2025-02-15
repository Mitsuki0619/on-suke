"use client";

import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
export function FlashMessageClient({ flash }: { flash: string | undefined }) {
  const { title, message } = JSON.parse(flash || "{}") as {
    title: string;
    message?: string | undefined;
  };
  useEffect(() => {
    if (title) {
      toast({ title, description: message });
    }
  }, [title, message]);

  return null;
}
