"use client";

import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
export function FlashMessageClient({ flash }: { flash: string | undefined }) {
  const { key, title, message } = JSON.parse(flash || "{}") as {
    key: string;
    title: string;
    message?: string | undefined;
  };
  useEffect(() => {
    if (key) {
      toast({ title, description: message });
    }
  }, [key, title, message]);

  return null;
}
