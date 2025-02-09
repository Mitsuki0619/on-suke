import { z } from "zod";

// `from` と `to` を ISO 8601 形式でバリデーション (UTC オフセット付き)
export const fetchSchedulesSchema = z
  .object({
    from: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?([+-]\d{2}:\d{2}|Z)$/,
        "from は ISO 8601 形式 (YYYY-MM-DDTHH:mm:ss±HH:mm) である必要があります",
      ),
    to: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?([+-]\d{2}:\d{2}|Z)$/,
        "to は ISO 8601 形式 (YYYY-MM-DDTHH:mm:ss±HH:mm) である必要があります",
      ),
  })
  .refine((data) => new Date(data.from) <= new Date(data.to), {
    message: "from は to より前の日時である必要があります",
    path: ["from"],
  });

export const searchParamsSchema = z.object({
  date: z.string().date().optional(),
  view: z
    .string()
    .optional()
    .refine(
      (data) => {
        return (
          data === "month" || data === "week" || data === "day" || data == null
        );
      },
      {
        message: "無効なパラメータです",
      },
    ),
});
