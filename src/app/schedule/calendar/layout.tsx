"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function CalendarPageLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowModal =
    pathname.endsWith("/add") || pathname.endsWith("/edit");
  return (
    <>
      {shouldShowModal && modal}
      {children}
    </>
  );
}
