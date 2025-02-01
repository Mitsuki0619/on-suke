import SignInWithGoogleButton from "@/app/login/components/sign-in-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>アカウントにログインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input id="password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">
            ログイン
          </Button>
          <div className="mt-4 text-center text-sm">または</div>
          <SignInWithGoogleButton />
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちでない方は
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/sign-up">サインアップ</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
