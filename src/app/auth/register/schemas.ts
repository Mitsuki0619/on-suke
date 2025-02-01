import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "ユーザー名を入力してください" })
    .max(20, { message: "ユーザー名は20文字以内で入力してください" }),
  email: z
    .string({ required_error: "メールアドレスを入力してください" })
    .email({ message: "メールアドレスの形式が正しくありません" }),
  password: z
    .string({
      required_error: "パスワードを入力してください",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .max(100, { message: "パスワードは100文字以内で入力してください" }),
  confirmPassword: z.string({
    required_error: "パスワード（確認）を入力してください",
  }),
});
