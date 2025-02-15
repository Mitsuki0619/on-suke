import { scheduleSchema } from "@/features/schedule/schemas/scheduleSchema";
import { dateTimeOrder } from "@/schemas/dateTime";
import type { z } from "zod";

export const addScheduleSchema = scheduleSchema.refine(dateTimeOrder, {
  message: "開始日時は終了日時より前でなければなりません",
  path: ["startTime"],
});

export type AddScheduleSchema = z.infer<typeof addScheduleSchema>;
