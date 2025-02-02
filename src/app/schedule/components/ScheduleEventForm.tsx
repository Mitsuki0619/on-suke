"use client";

import { addEvent } from "@/app/schedule/actions";
import { eventSchema } from "@/app/schedule/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldErrors } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Plus, PlusCircle, TrashIcon, X } from "lucide-react";
import { useActionState, useState } from "react";

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
    shouldRevalidate: "onInput",
  });

  const [categoriesValueState, setCategoriesValueState] = useState(
    fields.categories.initialValue,
  );
  const categoriesInputControl = useInputControl(fields.categories);

  const categories = fields.categories.getFieldList();
  const tasks = fields.tasks.getFieldList();
  const urls = fields.urls.getFieldList();

  const handleCheckCategory = (categoryId: number) => {
    const parsedId = categoryId.toString();
    if (!Array.isArray(categoriesValueState)) {
      setCategoriesValueState([parsedId]);
      categoriesInputControl.change([parsedId]);
      return;
    }
    const newValue = (
      categoriesValueState.includes(parsedId)
        ? categoriesValueState.filter((c) => c !== parsedId)
        : [...categoriesValueState, parsedId]
    ).filter((c) => c != null);
    setCategoriesValueState((prev) => {
      return newValue;
    });
    categoriesInputControl.change(newValue);
  };

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
            id={fields.title.id}
            key={fields.title.key}
            name={fields.title.name}
            defaultValue={fields.title.initialValue}
          />
          <FieldErrors errors={fields.title.allErrors} />
        </div>
        {/* カテゴリ選択 */}
        <div className="space-y-2">
          <Label>カテゴリ</Label>
          <div className="flex flex-wrap gap-2">
            {categoriesOptions.map((category) => {
              const parsedId = category.id.toString();
              const isChecked = categoriesValueState?.includes(parsedId);
              return (
                <Button
                  type="button"
                  key={category.id}
                  variant="ghost"
                  className="hover:bg-inherit w-min h-min p-0"
                  onClick={() => handleCheckCategory(category.id)}
                >
                  <Badge
                    key={category.id}
                    variant={isChecked ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1"
                  >
                    {category.name}
                    {isChecked && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* 概要入力 */}
        <div className="space-y-2">
          <Label htmlFor={fields.description.id}>概要</Label>
          <Textarea
            id={fields.description.id}
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
            rows={5}
          />
          <FieldErrors errors={fields.description.allErrors} />
        </div>

        {/* 開始・終了日時 */}
        <div className="flex gap-8">
          <div className="space-y-2 w-52">
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
          <div className="space-y-2 w-52">
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
                  id={fields.note.id}
                  key={fields.note.key}
                  name={fields.note.name}
                  defaultValue={fields.note.initialValue}
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
                            key={title.id}
                            name={title.name}
                            defaultValue={title.initialValue}
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
                            key={description.id}
                            name={description.name}
                            defaultValue={description.initialValue}
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
                                key={name.id}
                                name={name.name}
                                defaultValue={name.initialValue}
                                placeholder="名前"
                              />
                              <FieldErrors errors={name.allErrors} />
                            </div>
                            <div className="flex-1">
                              <Input
                                key={url.id}
                                name={url.name}
                                defaultValue={url.initialValue}
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
