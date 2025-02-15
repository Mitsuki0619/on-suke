import { scheduleSchema } from "@/features/schedule/schemas/scheduleSchema";
import { dateTimeOrder } from "@/schemas/dateTime";
import { z } from "zod";

export const editScheduleSchema = scheduleSchema
  .extend({
    scheduleId: z.string({ required_error: "scheduleId は必須です" }),
  })
  .refine(dateTimeOrder, {
    message: "開始日時は終了日時より前でなければなりません",
    path: ["startTime"],
  });

export type EditScheduleSchema = z.infer<typeof editScheduleSchema>;
