import { cookies } from "next/headers";

export async function serverFunc() {
  // ここでバリデーションしたり、API呼んだりORM使ったりと、サーバー側の処理を実行

  // すべて正常でここまでたどり着いたらcookieにメッセージをセットする
  (await cookies()).set("flash", "成功しました", { maxAge: 1 });

  return;
}
