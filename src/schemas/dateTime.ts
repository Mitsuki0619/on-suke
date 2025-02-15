import { parseISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { ZodError, z } from "zod";

const timeZone = "Asia/Tokyo"; // 例: 東京のタイムゾーン
export const dateTime = (target: string) =>
  z
    .string({ required_error: `${target}は必須です` })
    .refine(
      (str) => {
        // ISO 8601形式の日付文字列かどうかをチェック
        return !Number.isNaN(Date.parse(str));
      },
      {
        message: "無効な日付形式です",
      },
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

export const dateTimeOrder = (data: {
  startTime?: string;
  endTime?: string;
}) => {
  if (!data.startTime || !data.endTime) return false;
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  return startTime < endTime;
};
