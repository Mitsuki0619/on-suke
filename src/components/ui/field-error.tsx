export function FieldErrors({ errors }: { errors: Record<string, string[]> }) {
  return (
    <div className="text-red-500 text-sm">
      {Object.values(errors).map((errs) =>
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        errs.map((err, i) => <div key={i}>{err}</div>),
      )}
    </div>
  );
}
