"use client";

import {
  type CreateEventSchemaType,
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
  type FieldMetadata,
  type FormMetadata,
  type SubmissionResult,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Schedule } from "@prisma/client";
import { CheckCircle, Plus, PlusCircle, TrashIcon } from "lucide-react";
import { useActionState } from "react";
import type { z } from "zod";

type FormError = string[];

type TaskItemProps = {
  task: FieldMetadata<z.infer<typeof createEventSchema>["tasks"][number]>;
  form: FormMetadata<UpdateEventSchemaType & CreateEventSchemaType, FormError>;
  index: number;
};

type UrlItemProps = {
  urlItem: FieldMetadata<z.infer<typeof createEventSchema>["urls"][number]>;
  form: FormMetadata<UpdateEventSchemaType & CreateEventSchemaType, FormError>;
  index: number;
};

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
      className="space-y-8 bg-white p-6 rounded-lg shadow-md"
    >
      {initialValues?.scheduleId != null && (
        <input
          type="hidden"
          value={initialValues?.scheduleId}
          name="scheduleId"
        />
      )}
      <div className="space-y-6">
        {/* タイトル入力 */}
        <div className="space-y-2">
          <Label htmlFor={fields.title.id} className="text-lg font-semibold">
            タイトル
          </Label>
          <Input
            {...getInputProps(fields.title, { type: "text" })}
            key={fields.title.key}
            className="text-lg"
            placeholder="イベントのタイトルを入力"
          />
          <FieldErrors errors={fields.title.allErrors} />
        </div>

        {/* カテゴリ選択 */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">カテゴリ</Label>
          <div className="flex flex-wrap gap-2">
            <RadioGroupBadge
              options={categoryOptions}
              name={fields.categoryId.name}
              defaultValue={fields.categoryId.initialValue}
            />
          </div>
          <FieldErrors errors={fields.categoryId.allErrors} />
        </div>

        {/* 概要入力 */}
        <div className="space-y-2">
          <Label
            htmlFor={fields.description.id}
            className="text-lg font-semibold"
          >
            概要
          </Label>
          <Textarea
            {...getInputProps(fields.description, { type: "text" })}
            key={fields.description.key}
            rows={5}
            placeholder="イベントの概要を入力"
            className="resize-none"
          />
          <FieldErrors errors={fields.description.allErrors} />
        </div>

        {/* 開始・終了日時 */}
        <div className="flex gap-8">
          <div className="space-y-2 w-1/2">
            <Label
              htmlFor={fields.startTime.id}
              className="text-lg font-semibold"
            >
              開始日時
            </Label>
            <Input
              {...getInputProps(fields.startTime, { type: "datetime-local" })}
              key={fields.startTime.key}
              className="text-lg"
            />
            <FieldErrors errors={fields.startTime.allErrors} />
          </div>
          <div className="space-y-2 w-1/2">
            <Label
              htmlFor={fields.endTime.id}
              className="text-lg font-semibold"
            >
              終了日時
            </Label>
            <Input
              {...getInputProps(fields.endTime, { type: "datetime-local" })}
              key={fields.endTime.key}
              className="text-lg"
            />
            <FieldErrors errors={fields.endTime.allErrors} />
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="overflow-hidden rounded-lg border"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="hover:no-underline text-lg font-semibold px-4 py-2 bg-theme-orange-100">
              詳細情報
            </AccordionTrigger>
            <AccordionContent className="bg-theme-orange-100/50 p-6 space-y-6">
              {/* メモ */}
              <div className="space-y-2">
                <Label
                  htmlFor={fields.note.id}
                  className="text-lg font-semibold"
                >
                  メモ
                </Label>
                <Textarea
                  {...getInputProps(fields.note, { type: "text" })}
                  key={fields.note.key}
                  rows={3}
                  placeholder="追加のメモを入力"
                  className="resize-none"
                />
                <FieldErrors errors={fields.note.allErrors} />
              </div>

              {/* タスク一覧 */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">タスク</Label>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <TaskItem
                      key={task.key}
                      task={task}
                      form={form}
                      index={index}
                    />
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-2"
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
                    <Plus className="mr-2" />
                    タスクを追加
                  </Button>
                </div>
              </div>

              {/* URL一覧 */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">URL</Label>
                <div className="space-y-4">
                  {urls.map((urlItem, index) => (
                    <UrlItem
                      key={urlItem.key}
                      urlItem={urlItem}
                      form={form}
                      index={index}
                    />
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    {...form.insert.getButtonProps({
                      name: fields.urls.name,
                      defaultValue: { name: "", url: "" },
                    })}
                  >
                    <Plus className="mr-2" />
                    URLを追加
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 登録 */}
      <div className="flex justify-end">
        <Button type="submit" className="text-lg px-6 py-3">
          {initialValues != null ? (
            <>
              <CheckCircle className="mr-2" />
              保存
            </>
          ) : (
            <>
              <PlusCircle className="mr-2" />
              登録
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function TaskItem({ task, form, index }: TaskItemProps) {
  const { title, description, status, priority } = task.getFieldset();
  const { key: _1, ...statusProps } = getSelectProps(status);
  const { key: _2, ...priorityProps } = getSelectProps(priority);

  return (
    <Card className="p-4 border rounded-lg shadow-sm space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            {...getInputProps(title, { type: "text" })}
            placeholder="タスクタイトル"
            key={title.key}
            className="text-lg"
          />
          <FieldErrors errors={title.allErrors} />
        </div>
        <Button
          variant="outline"
          {...form.remove.getButtonProps({
            name: task.name,
            index: index,
          })}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label className="text-sm">ステータス</Label>
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
            <SelectTrigger>
              <SelectValue placeholder="ステータスを選択" />
            </SelectTrigger>
            <SelectContent>
              {taskStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldErrors errors={status.allErrors} />
        </div>
        <div className="w-1/2">
          <Label className="text-sm">優先度</Label>
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
            <SelectTrigger>
              <SelectValue placeholder="優先度を選択" />
            </SelectTrigger>
            <SelectContent>
              {taskPriorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldErrors errors={priority.allErrors} />
        </div>
      </div>
      <div>
        <Textarea
          {...getInputProps(description, { type: "text" })}
          key={description.key}
          placeholder="タスク詳細"
          rows={2}
          className="resize-none"
        />
        <FieldErrors errors={description.allErrors} />
      </div>
    </Card>
  );
}

function UrlItem({ urlItem, form, index }: UrlItemProps) {
  const { name, url } = urlItem.getFieldset();

  return (
    <Card className="p-4 border rounded-lg shadow-sm flex gap-4">
      <div className="flex-1">
        <Input
          {...getInputProps(name, { type: "text" })}
          placeholder="名前"
          key={name.key}
          className="mb-2"
        />
        <FieldErrors errors={name.allErrors} />
      </div>
      <div className="flex-1">
        <Input
          {...getInputProps(url, { type: "text" })}
          key={url.key}
          placeholder="URL"
          className="mb-2"
        />
        <FieldErrors errors={url.allErrors} />
      </div>
      <Button
        variant="outline"
        {...form.remove.getButtonProps({
          name: urlItem.name,
          index: index,
        })}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </Card>
  );
}
