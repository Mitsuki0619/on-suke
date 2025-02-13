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
    <div className="relative">
      {children}
      {isLoading && (
        <div
          className="absolute z-50 inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {message && (
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
