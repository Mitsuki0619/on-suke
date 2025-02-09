"use client";

import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
export function FlashMessageClient({ flash }: { flash: string | undefined }) {
  useEffect(() => {
    if (flash) {
      toast({ title: "success!", description: flash });
    }
  });

  return null;
}
