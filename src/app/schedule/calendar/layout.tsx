import type { ReactNode } from "react";

export default function CalendarPageLayout({
  children,
  addModal,
  editModal,
}: {
  children: ReactNode;
  addModal: ReactNode;
  editModal: ReactNode;
}) {
  return (
    <>
      {editModal}
      {addModal}
      {children}
    </>
  );
}
