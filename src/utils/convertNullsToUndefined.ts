type NullToUndefined<T> = T extends null
  ? undefined
  : T extends Date
    ? Date // Date はそのまま
    : T extends (infer U)[]
      ? NullToUndefined<U>[]
      : T extends object
        ? { [K in keyof T]: NullToUndefined<T[K]> }
        : T;

export const convertNullsToUndefined = <T>(obj: T): NullToUndefined<T> => {
  if (obj === null) return undefined as NullToUndefined<T>;
  if (obj instanceof Date) return obj as NullToUndefined<T>; // Date はそのまま
  if (Array.isArray(obj))
    return obj.map(convertNullsToUndefined) as NullToUndefined<T>;
  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertNullsToUndefined(value),
      ]),
    ) as NullToUndefined<T>;
  }
  return obj as NullToUndefined<T>;
};
