import * as z from "zod";

export const eventSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です。",
    })
    .max(100, { message: "タイトルは100文字以下で入力してください" }),
  categories: z.array(z.string().regex(/^\d+$/).transform(Number)),
  description: z
    .string()
    .max(500, { message: "説明は500文字以下で入力してください" })
    .optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  note: z
    .string()
    .max(500, { message: "メモは500文字以下で入力してください" })
    .optional(),
  tasks: z.array(
    z.object({
      title: z
        .string({
          required_error: "タスクのタイトルは必須です。",
        })
        .max(100, {
          message: "タスクのタイトルは100文字以下で入力してください",
        }),
      description: z
        .string()
        .max(500, { message: "タスクの説明は500文字以下で入力してください" })
        .optional(),
    })
  ),
  urls: z.array(
    z.object({
      name: z
        .string({ required_error: "URLの名前は必須です。" })
        .max(100, { message: "URLの名前は100文字以下で入力してください" }),
      url: z
        .string({ required_error: "URLは必須です。" })
        .url("有効なURLを入力してください")
        .max(200, { message: "URLは200文字以下で入力してください" }),
    })
  ),
});
