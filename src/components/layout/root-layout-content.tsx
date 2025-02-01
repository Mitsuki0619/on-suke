import { Sidebar } from "@/components/ui/sidebar";
import type React from "react";

export default function RootLayoutContent({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-main-background">
        {children}
      </main>
    </div>
  );
}
