import { z } from "zod";

const categorySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).optional(),
  name: z
    .string({
      required_error: "カテゴリ名は必須です",
    })
    .max(15, { message: "カテゴリ名は15文字以内で入力してください" }),
  color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
    message: "不正なカラーコードです",
  }),
});

export const updateCategoriesSchema = z.object({
  items: z
    .array(categorySchema)
    .max(8, { message: "カテゴリは最大8個までです" }),
});

export type UpdateCategoriesSchema = z.infer<typeof updateCategoriesSchema>;
