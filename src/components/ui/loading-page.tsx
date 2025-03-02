import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="text-center" aria-busy="true" aria-live="polite">
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-primary mx-auto" />
        <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
}
