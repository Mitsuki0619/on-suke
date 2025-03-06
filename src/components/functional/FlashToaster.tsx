"use client";

import { useFlash } from "@/hooks/use-flash";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function FlashToaster() {
  const flashContent = useFlash();

  useEffect(() => {
    if (flashContent?.key) {
      toast({
        title: flashContent.title,
        description: flashContent.description,
      });
    }
  }, [flashContent?.title, flashContent?.key, flashContent?.description]);
  return null;
}
