import type React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  message = "Loading...",
}: LoadingOverlayProps) {
  return (
    <div className="relative w-full h-full">
      {children}
      {isLoading && (
        <div
          className="absolute z-50 inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="text-center p-4 sm:p-6 md:p-8">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-primary mx-auto" />
            {message && (
              <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
