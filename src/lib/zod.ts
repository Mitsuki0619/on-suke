import { z, ZodError } from "zod";

export const dateSchema = z
  .string()
  .transform((str) => {
    if (!str) return;
    // `Date` オブジェクトに変換
    const date = new Date(str);

    if (Number.isNaN(date.getTime())) {
      throw new ZodError([
        {
          code: "custom",
          message: "無効な日付形式です",
          path: [],
        },
      ]);
    }

    return date.toISOString(); // ISO 8601 形式に変換
  })
  .optional();
