"use client";

import { RegisterForm } from "@/app/auth/register/components/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>アカウント登録</CardTitle>
          <CardDescription>新しいアカウントを作成してください</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            すでにアカウントをお持ちの方は
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/auth/login">ログイン</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
