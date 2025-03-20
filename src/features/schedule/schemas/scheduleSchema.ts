import { TaskPriorityEnum } from "@/features/task/enums/taskPriority";
import { TaskStatusEnum } from "@/features/task/enums/taskStatus";
import { dateTime } from "@/schemas/dateTime";
import { z } from "zod";

export const scheduleSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です",
    })
    .max(100, { message: "タイトルは100文字以下で入力してください" }),
  categoryId: z.string().regex(/^\d+$/).transform(Number).optional(),
  description: z
    .string()
    .max(3000, { message: "説明は3000文字以下で入力してください" })
    .optional(),
  startTime: dateTime("開始日時"),
  endTime: dateTime("終了日時"),
  note: z
    .string()
    .max(3000, { message: "メモは3000文字以下で入力してください" })
    .optional(),
  tasks: z.array(
    z.object({
      id: z.string().optional(),
      title: z
        .string({
          required_error: "タスクのタイトルは必須です",
        })
        .max(100, {
          message: "タスクのタイトルは100文字以下で入力してください",
        }),
      description: z
        .string()
        .max(500, { message: "タスクの説明は500文字以下で入力してください" })
        .optional(),
      status: z.enum(TaskStatusEnum, {
        required_error: "タスクのステータスは必須です",
      }),
      priority: z.enum(TaskPriorityEnum, {
        required_error: "タスクの優先度は必須です",
      }),
    }),
  ),
  urls: z.array(
    z.object({
      id: z.string().optional(),
      name: z
        .string({ required_error: "URLの名前は必須です" })
        .max(100, { message: "URLの名前は100文字以下で入力してください" }),
      url: z
        .string({ required_error: "URLは必須です" })
        .url("有効なURLを入力してください")
        .max(200, { message: "URLは200文字以下で入力してください" }),
    }),
  ),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
