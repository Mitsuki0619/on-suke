import { useCookie } from "@/hooks/use-cookie";
import { z } from "zod";

const flashContentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  key: z.string(),
});

export type FlashContent = z.infer<typeof flashContentSchema>;

export function useFlash() {
  const cookieValueJson = useCookie("flash");
  if (!cookieValueJson) return undefined;
  const decodedStr = decodeURIComponent(cookieValueJson);
  const parsedCookieValue = JSON.parse(decodedStr);
  const { data } = flashContentSchema.safeParse(parsedCookieValue);
  return data;
}
