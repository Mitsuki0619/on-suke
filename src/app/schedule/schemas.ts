import * as z from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  categories: z.array(z.z.preprocess((v) => Number(v), z.number())),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  note: z.string().optional(),
  tasks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  urls: z.array(
    z.object({
      name: z.string(),
      url: z.string().url("有効なURLを入力してください"),
    }),
  ),
});
