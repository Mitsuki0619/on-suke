import { cn } from "@/lib/utils";

export function FieldErrors({
  errors,
  className,
}: { errors: string[] | undefined; className?: string }) {
  if (errors == null || !errors.length) return null;
  return (
    <div className={cn("text-red-500 text-sm", className)}>
      {errors.map((err, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: errors are static strings with stable order
        <div key={i}>{err}</div>
      ))}
    </div>
  );
}
