"use client";

import { addEvent } from "@/app/schedule/actions";
import { eventSchema } from "@/app/schedule/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CheckboxBadge from "@/components/ui/checkbox-badge";
import { FieldErrors } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus, PlusCircle, TrashIcon } from "lucide-react";
import { useActionState } from "react";

export function ScheduleEventFormClient({
  categories,
}: {
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [lastResult, action] = useActionState(addEvent, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: eventSchema });
    },
    shouldRevalidate: "onInput",
  });

  const tasks = fields.tasks.getFieldList();
  const urls = fields.urls.getFieldList();

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="space-y-6"
    >
      <div className="space-y-4">
        {/* タイトル入力 */}
        <div className="space-y-2">
          <Label htmlFor={fields.title.id}>タイトル</Label>
          <Input
            {...getInputProps(fields.title, { type: "text" })}
            key={fields.title.key}
          />
          <FieldErrors errors={fields.title.allErrors} />
        </div>
        {/* カテゴリ選択 */}
        <div className="space-y-2">
          <Label>カテゴリ</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <CheckboxBadge
                {...getInputProps(fields.categories, { type: "checkbox" })}
                value={category.id}
                defaultChecked={
                  fields.categories.initialValue &&
                  Array.isArray(fields.categories.initialValue)
                    ? fields.categories.initialValue.includes(
                        category.id.toString(),
                      )
                    : fields.categories.initialValue === category.id.toString()
                }
                key={`${category.id}-${fields.categories.key}`}
                label={category.name}
              />
            ))}
          </div>
        </div>
        <FieldErrors errors={fields.categories.allErrors} />

        {/* 概要入力 */}
        <div className="space-y-2">
          <Label htmlFor={fields.description.id}>概要</Label>
          <Textarea
            {...getInputProps(fields.description, { type: "text" })}
            key={fields.description.key}
            rows={5}
          />
          <FieldErrors errors={fields.description.allErrors} />
        </div>

        {/* 開始・終了日時 */}
        <div className="flex gap-8">
          <div className="space-y-2 w-52">
            <Label htmlFor={fields.startTime.id}>開始日時</Label>
            <Input
              {...getInputProps(fields.startTime, { type: "datetime-local" })}
              key={fields.startTime.key}
            />
            <FieldErrors errors={fields.startTime.allErrors} />
          </div>
          <div className="space-y-2 w-52">
            <Label htmlFor={fields.endTime.id}>終了日時</Label>
            <Input
              {...getInputProps(fields.endTime, { type: "datetime-local" })}
              key={fields.endTime.key}
            />
            <FieldErrors errors={fields.endTime.allErrors} />
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline text-sm justify-end gap-3 text-gray-500 hover:text-primary">
              詳細
            </AccordionTrigger>
            <AccordionContent className="bg-main-background p-6">
              {/* メモ */}
              <div className="space-y-2">
                <Label htmlFor={fields.note.id}>メモ</Label>
                <Textarea
                  {...getInputProps(fields.note, {
                    type: "text",
                  })}
                  key={fields.note.key}
                  rows={3}
                />
                <FieldErrors errors={fields.note.allErrors} />
              </div>

              {/* タスク一覧 */}
              <div className="space-y-2">
                <Label>タスク</Label>
                <div className="space-y-4 text-center">
                  {tasks.map((task, index) => {
                    const { title, description } = task.getFieldset();
                    return (
                      <Card
                        key={task.key}
                        className="p-4 border rounded-lg shadow-sm grid grid-cols-2 gap-y-3"
                      >
                        <div>
                          <Input
                            {...getInputProps(title, { type: "text" })}
                            key={title.key}
                            placeholder="タスクタイトル"
                          />
                          <FieldErrors errors={title.allErrors} />
                        </div>
                        <div className="text-end">
                          <Button
                            variant="secondary"
                            {...form.remove.getButtonProps({
                              name: fields.tasks.name,
                              index: index,
                            })}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="col-span-2">
                          <Textarea
                            {...getInputProps(description, { type: "text" })}
                            key={description.key}
                            placeholder="タスク詳細"
                            rows={2}
                          />
                          <FieldErrors errors={description.allErrors} />
                        </div>
                      </Card>
                    );
                  })}
                  <Button
                    variant="secondary"
                    className="w-3/4 mt-2"
                    {...form.insert.getButtonProps({
                      name: fields.tasks.name,
                      defaultValue: { title: "", description: "" },
                    })}
                  >
                    <Plus />
                    タスクを追加
                  </Button>
                </div>
              </div>

              {/* URL一覧 */}
              <div className="mt-4 space-y-2">
                <Label>URL</Label>
                <div className="text-center">
                  <div className="space-y-4">
                    {urls.map((urlItem, index) => {
                      const { name, url } = urlItem.getFieldset();
                      return (
                        <Card
                          key={urlItem.key}
                          className="p-4 border rounded-lg shadow-sm flex gap-8"
                        >
                          <div className="flex gap-4 flex-1">
                            <div className="w-52">
                              <Input
                                {...getInputProps(name, {
                                  type: "text",
                                })}
                                placeholder="名前"
                                key={url.key}
                              />
                              <FieldErrors errors={name.allErrors} />
                            </div>
                            <div className="flex-1">
                              <Input
                                {...getInputProps(url, {
                                  type: "text",
                                })}
                                key={url.key}
                                placeholder="URL"
                              />
                              <FieldErrors errors={url.allErrors} />
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="secondary"
                              {...form.remove.getButtonProps({
                                name: fields.urls.name,
                                index: index,
                              })}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                    <Button
                      variant="secondary"
                      className="w-3/4 mt-2"
                      {...form.insert.getButtonProps({
                        name: fields.urls.name,
                        defaultValue: { name: "", url: "" },
                      })}
                    >
                      <Plus />
                      URLを追加
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 登録 */}
      <div className="flex justify-end">
        <Button type="submit">
          <PlusCircle />
          新規登録
        </Button>
      </div>
    </form>
  );
}
