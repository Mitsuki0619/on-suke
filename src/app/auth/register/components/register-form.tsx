"use client";

import { register } from "@/app/auth/register/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema } from "@/app/auth/register/schemas";
import { FieldErrors } from "@/components/ui/field-error";
import { useActionState } from "react";

export function RegisterForm() {
  const [lastResult, action] = useActionState(register, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            key={fields.username.key}
            name={fields.username.name}
            defaultValue={fields.username.initialValue}
          />
          <FieldErrors errors={fields.username.allErrors} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="text"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
          />
          <FieldErrors errors={fields.email.allErrors} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            key={fields.password.key}
            name={fields.password.name}
            defaultValue={fields.password.initialValue}
          />
          <FieldErrors errors={fields.password.allErrors} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="confirmPassword">パスワード（確認）</Label>
          <Input
            id="confirmPassword"
            type="password"
            key={fields.confirmPassword.key}
            name={fields.confirmPassword.name}
            defaultValue={fields.confirmPassword.initialValue}
          />
          <FieldErrors errors={fields.confirmPassword.allErrors} />
        </div>
      </div>
      <Button className="w-full mt-6" type="submit">
        登録
      </Button>
    </form>
  );
}
