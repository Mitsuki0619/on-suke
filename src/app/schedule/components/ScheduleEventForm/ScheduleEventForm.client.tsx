"use client";

import {
  type UpdateEventSchemaType,
  createEventSchema,
  updateEventSchema,
} from "@/app/schedule/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldErrors } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RadioGroupBadge from "@/components/ui/radio-group-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { taskPriorityOptions } from "@/enums/taskPriority";
import { taskStatusOptions } from "@/enums/taskStatus";
import {
  type SubmissionResult,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Schedule } from "@prisma/client";
import { CheckCircle, Plus, PlusCircle, TrashIcon } from "lucide-react";
import { useActionState } from "react";

export function ScheduleEventFormClient({
  eventMutateAction,
  categories,
  initialValues,
}: {
  eventMutateAction: (
    _: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
  scheduleId?: Schedule["id"];
  initialValues?: UpdateEventSchemaType;
  categories: {
    id: number;
    name: string;
    color: string;
  }[];
}) {
  const [lastResult, action] = useActionState(eventMutateAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    defaultValue: initialValues,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema:
          initialValues?.scheduleId != null
            ? updateEventSchema
            : createEventSchema,
      });
    },
    shouldRevalidate: "onInput",
  });

  const tasks = fields.tasks.getFieldList();
  const urls = fields.urls.getFieldList();

  const categoryOptions = [
    { label: "なし", value: "", color: "606060" },
    ...categories.map((cat) => ({
      label: cat.name,
      value: cat.id.toString(),
      color: cat.color,
    })),
  ];

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="space-y-6"
    >
      {initialValues?.scheduleId != null && (
        <input
          type="hidden"
          value={initialValues?.scheduleId}
          name="scheduleId"
        />
      )}
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
            <RadioGroupBadge
              options={categoryOptions}
              name={fields.categoryId.name}
              defaultValue={fields.categoryId.initialValue}
            />
          </div>
        </div>
        <FieldErrors errors={fields.categoryId.allErrors} />

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
                    const { title, description, status, priority } =
                      task.getFieldset();
                    const { key: _1, ...statusProps } = getSelectProps(status);
                    const { key: _2, ...priorityProps } =
                      getSelectProps(priority);
                    return (
                      <Card
                        key={task.key}
                        className="p-4 border rounded-lg shadow-sm grid grid-cols-3 gap-y-3"
                      >
                        <div>
                          <Input
                            {...getInputProps(title, { type: "text" })}
                            placeholder="タスクタイトル"
                            key={title.key}
                          />
                          <FieldErrors errors={title.allErrors} />
                        </div>
                        <div className="flex justify-end gap-2 col-span-2">
                          <div className="col-span-2 flex gap-4">
                            <div className="flex items-center gap-3">
                              <Label className="text-xs">ステータス</Label>
                              <Select
                                {...statusProps}
                                defaultValue={statusProps.defaultValue?.toString()}
                                onValueChange={(value) => {
                                  form.update({
                                    name: status.name,
                                    value,
                                  });
                                }}
                              >
                                <SelectTrigger className="w-[120px] ">
                                  <SelectValue placeholder="ステータスを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                  {taskStatusOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldErrors
                                errors={task.getFieldset().status.allErrors}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <Label>優先度</Label>
                              <Select
                                {...priorityProps}
                                defaultValue={priorityProps.defaultValue?.toString()}
                                onValueChange={(value) => {
                                  form.update({
                                    name: priority.name,
                                    value,
                                  });
                                }}
                              >
                                <SelectTrigger className="w-[120px] ">
                                  <SelectValue placeholder="優先度を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                  {taskPriorityOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FieldErrors
                                errors={task.getFieldset().priority.allErrors}
                              />
                            </div>
                          </div>
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
                        <div className="col-span-3">
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
                    variant="link"
                    className="w-3/4 mt-2"
                    {...form.insert.getButtonProps({
                      name: fields.tasks.name,
                      defaultValue: {
                        title: "",
                        description: "",
                        status: "TODO",
                        priority: "MEDIUM",
                      },
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
                      variant="link"
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
          {initialValues != null ? (
            <>
              <CheckCircle />
              保存
            </>
          ) : (
            <>
              <PlusCircle />
              登録
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
