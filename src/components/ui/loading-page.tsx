import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="w-full h-full justify-center items-center">
      <div
        className="h-full flex items-center justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
