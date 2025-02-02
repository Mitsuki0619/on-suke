"use client";

import { addEvent } from "@/app/schedule/actions";
import { eventSchema } from "@/app/schedule/schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldErrors } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

const categoriesOptions = [
  { id: 1, name: "仕事" },
  { id: 2, name: "個人" },
  { id: 3, name: "家族" },
  { id: 4, name: "趣味" },
];

export function ScheduleEventForm() {
  const [lastResult, action] = useActionState(addEvent, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: eventSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={fields.title.id}>タイトル</Label>
              <Input
                id={fields.title.id}
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
              />
              <FieldErrors errors={fields.title.allErrors} />
            </div>

            <div className="space-y-2">
              <Label>カテゴリ</Label>
              <div className="flex flex-wrap gap-2">
                {categoriesOptions.map((category) => (
                  <Badge
                    key={category.id}
                    variant={
                      fields.categories.value?.includes(category.id.toString())
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.description.id}>概要</Label>
              <Textarea
                id={fields.description.id}
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                rows={3}
              />
              <FieldErrors errors={fields.description.allErrors} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={fields.startTime.id}>開始日時</Label>
                <Input
                  id={fields.startTime.id}
                  key={fields.startTime.key}
                  name={fields.startTime.name}
                  defaultValue={fields.startTime.initialValue}
                  type="datetime-local"
                />
                <FieldErrors errors={fields.startTime.allErrors} />
              </div>

              <div className="space-y-2">
                <Label htmlFor={fields.endTime.id}>終了日時</Label>
                <Input
                  id={fields.endTime.id}
                  key={fields.endTime.key}
                  name={fields.endTime.name}
                  defaultValue={fields.endTime.initialValue}
                  type="datetime-local"
                />
                <FieldErrors errors={fields.endTime.allErrors} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.note.id}>メモ</Label>
              <Textarea
                id={fields.note.id}
                key={fields.note.key}
                name={fields.note.name}
                defaultValue={fields.note.initialValue}
                rows={3}
              />
              <FieldErrors errors={fields.note.allErrors} />
            </div>

            <div className="space-y-2">
              <Label>タスク</Label>
              <div className="space-y-4">
                {fields.tasks.getFieldList().map((task) => {
                  const { title, description } = task.getFieldset();
                  return (
                    <Card key={task.key} className="p-4 space-y-2">
                      <Input
                        key={title.id}
                        name={title.name}
                        defaultValue={title.initialValue}
                        placeholder="タスクタイトル"
                      />
                      <Textarea
                        key={description.id}
                        name={description.name}
                        defaultValue={description.initialValue}
                        placeholder="タスク詳細"
                        rows={2}
                      />
                    </Card>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  {...form.insert.getButtonProps({
                    name: fields.tasks.name,
                    defaultValue: {
                      title: "",
                      description: "",
                    },
                  })}
                >
                  タスクを追加
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>URL</Label>
              <div className="space-y-4">
                {fields.urls.getFieldList().map((url) => {
                  const { name, url: urlField } = url.getFieldset();
                  return (
                    <Card key={url.key} className="p-4 space-y-2">
                      <Input
                        key={name.id}
                        name={name.name}
                        defaultValue={name.initialValue}
                        placeholder="名前"
                      />
                      <Input
                        key={urlField.id}
                        name={urlField.name}
                        defaultValue={urlField.initialValue}
                        placeholder="URL"
                      />
                    </Card>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  {...form.insert.getButtonProps({
                    name: fields.urls.name,
                    defaultValue: {
                      name: "",
                      url: "",
                    },
                  })}
                >
                  URLを追加
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">追加</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
