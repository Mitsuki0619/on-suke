"use client";

import { SessionProvider } from "next-auth/react";
import type React from "react";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>{children}</Suspense>
    </SessionProvider>
  );
}
