import { Sidebar } from "@/components/ui/sidebar";
import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main
        className="
      flex-1 overflow-y-auto 
      bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-100 
      dark:from-orange-900 dark:via-orange-800 dark:to-yellow-900 
      transition-colors duration-500 
      pt-10 pb-36 px-4 md:p-8
      md:pb-8
      pb-[calc(9rem+env(safe-area-inset-bottom))]
      pt-[calc(4rem+env(safe-area-inset-top))]
      px-[calc(1rem+env(safe-area-inset-right))]
      pl-[calc(1rem+env(safe-area-inset-left))]
    "
      >
        <div className="relative min-h-[calc(100vh-5rem)] md:min-h-full">
          <div
            className="
          relative z-10 w-full mx-auto 
          bg-white/90 dark:bg-gray-800/90 
          backdrop-blur-md rounded-xl shadow-lg 
          p-4 md:p-6 
          transition-all duration-300 
          border border-orange-200 dark:border-orange-700 
          max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl
        "
          >
            <div className="animate-fadeIn">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
