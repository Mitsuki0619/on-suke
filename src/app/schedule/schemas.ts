import { TaskPriorityEnum } from "@/enums/taskPriority";
import { TaskStatusEnum } from "@/enums/taskStatus";
import { parseISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { ZodError, z } from "zod";

const timeZone = "Asia/Tokyo"; // 例: 東京のタイムゾーン
const dateSchema = (target: string) =>
  z
    .string({ required_error: `${target}は必須です` })
    .refine(
      (str) => {
        // ISO 8601形式の日付文字列かどうかをチェック
        return !Number.isNaN(Date.parse(str));
      },
      {
        message: "無効な日付形式です",
      }
    )
    .transform((str) => {
      if (!str) {
        throw new ZodError([
          {
            code: "custom",
            message: "無効な日付形式です",
            path: [],
          },
        ]);
      }
      // 文字列をパースしてUTC日時として解釈
      const date = parseISO(str);
      // UTCからタイムゾーンを考慮した日時に変換
      const formattedDate = fromZonedTime(date, timeZone).toISOString();
      return formattedDate;
    });

const baseEventSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です",
    })
    .max(100, { message: "タイトルは100文字以下で入力してください" }),
  categoryId: z.string().regex(/^\d+$/).transform(Number).optional(),
  description: z
    .string()
    .max(500, { message: "説明は500文字以下で入力してください" })
    .optional(),
  startTime: dateSchema("開始日時"),
  endTime: dateSchema("終了日時"),
  note: z
    .string()
    .max(500, { message: "メモは500文字以下で入力してください" })
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
    })
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
    })
  ),
});

const createBaseEventSchema = baseEventSchema;

const updateBaseEventSchema = baseEventSchema.extend({
  scheduleId: z.string({ required_error: "scheduleId は必須です" }),
});

const validateDateOrder = (data: { startTime?: string; endTime?: string }) => {
  if (!data.startTime || !data.endTime) return false;
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  return startTime < endTime;
};

export const createEventSchema = createBaseEventSchema.refine(
  validateDateOrder,
  {
    message: "開始日時は終了日時より前でなければなりません",
    path: ["startTime"],
  }
);

export const updateEventSchema = updateBaseEventSchema.refine(
  validateDateOrder,
  {
    message: "開始日時は終了日時より前でなければなりません",
    path: ["startTime"],
  }
);

export type CreateEventSchemaType = z.infer<typeof createBaseEventSchema>;
export type UpdateEventSchemaType = z.infer<typeof updateBaseEventSchema>;
