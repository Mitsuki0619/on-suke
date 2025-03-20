"use client";

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
import { DeleteScheduleButton } from "@/features/schedule/components/DeleteScheduleButton/DeleteScheduleButton";
import { RestoreScheduleButton } from "@/features/schedule/components/RestoreScheduleButton/RestoreScheduleButton";
import {
  type AddScheduleSchema,
  addScheduleSchema,
} from "@/features/schedule/schemas/addScheduleSchema";
import {
  type EditScheduleSchema,
  editScheduleSchema,
} from "@/features/schedule/schemas/editScheduleSchema";
import { taskPriorityOptions } from "@/features/task/enums/taskPriority";
import { taskStatusOptions } from "@/features/task/enums/taskStatus";
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
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

type FormError = string[];

type TaskItemProps = {
  tasks: FieldMetadata<AddScheduleSchema["tasks"]>;
  task: FieldMetadata<EditScheduleSchema["tasks"][number]>;
  form: FormMetadata<EditScheduleSchema & AddScheduleSchema, FormError>;
  index: number;
};

type UrlItemProps = {
  urls: FieldMetadata<AddScheduleSchema["urls"]>;
  urlItem: FieldMetadata<AddScheduleSchema["urls"][number]>;
  form: FormMetadata<EditScheduleSchema & AddScheduleSchema, FormError>;
  index: number;
};

export function ScheduleFormClient({
  type,
  eventMutateAction,
  categories,
  initialValues,
  isDeleted,
}: {
  type: "add" | "edit";
  eventMutateAction: (
    _: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
  scheduleId?: Schedule["id"];
  initialValues?: EditScheduleSchema;
  isDeleted?: boolean;
  categories: {
    id: number;
    name: string;
    color: string;
  }[];
}) {
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const router = useRouter();
  const submitFunction = async (_: unknown, formData: FormData) => {
    const res = await eventMutateAction(_, formData);
    if (res.status === "success") {
      router.back();
    }
    return res;
  };

  const [lastResult, action, isPending] = useActionState(
    submitFunction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    defaultValue: initialValues,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: type === "edit" ? editScheduleSchema : addScheduleSchema,
      });
    },
    shouldRevalidate: "onInput",
  });

  const tasks = fields.tasks.getFieldList();
  const urls = fields.urls.getFieldList();

  const categoryOptions = [
    { label: "なし", value: "", color: "#606060" },
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
      className="bg-white"
      key={form.key}
    >
      {type === "edit" && (
        <input
          type="hidden"
          value={initialValues?.scheduleId}
          name="scheduleId"
        />
      )}
      <div className="space-y-4 sm:space-y-6">
        {/* タイトル入力 */}
        <div className="space-y-2">
          <Label
            htmlFor={fields.title.id}
            className="text-base sm:text-lg font-semibold"
          >
            タイトル
          </Label>
          <Input
            {...getInputProps(fields.title, { type: "text" })}
            key={fields.title.key}
            className="text-lg"
            placeholder="イベントのタイトルを入力"
          />
          <FieldErrors errors={fields.title.errors} />
        </div>

        {/* カテゴリ選択 */}
        <div className="space-y-2">
          <Label className="text-base sm:text-lg font-semibold">カテゴリ</Label>
          <div className="flex flex-wrap gap-2">
            <RadioGroupBadge
              options={categoryOptions}
              name={fields.categoryId.name}
              defaultValue={fields.categoryId.initialValue}
            />
          </div>
          <FieldErrors errors={fields.categoryId.errors} />
        </div>

        {/* 概要入力 */}
        <div className="space-y-2">
          <Label
            htmlFor={fields.description.id}
            className="text-base sm:text-lg font-semibold"
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
          <FieldErrors errors={fields.description.errors} />
        </div>

        {/* 開始・終了日時 */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="space-y-2 w-full sm:w-1/2">
            <Label
              htmlFor={fields.startTime.id}
              className="text-base sm:text-lg font-semibold"
            >
              開始日時
            </Label>
            <Input
              {...getInputProps(fields.startTime, { type: "datetime-local" })}
              key={fields.startTime.key}
              className="text-lg"
            />
            <FieldErrors errors={fields.startTime.errors} />
          </div>
          <div className="space-y-2 w-full sm:w-1/2">
            <Label
              htmlFor={fields.endTime.id}
              className="text-base sm:text-lg font-semibold"
            >
              終了日時
            </Label>
            <Input
              {...getInputProps(fields.endTime, { type: "datetime-local" })}
              key={fields.endTime.key}
              className="text-lg"
            />
            <FieldErrors errors={fields.endTime.errors} />
          </div>
        </div>

        <Accordion type="single" className="overflow-hidden rounded-lg border">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger
              className="hover:no-underline text-base sm:text-lg font-semibold px-3 sm:px-4 py-2 bg-theme-orange-100"
              onClick={() => setIsOpenAccordion((prev) => !prev)}
            >
              詳細情報
            </AccordionTrigger>
            <AccordionContent
              className="bg-theme-orange-100/50 p-4 sm:p-6 space-y-4 sm:space-y-6"
              forceMount
              hidden={!isOpenAccordion}
            >
              {/* メモ */}
              <div className="space-y-2">
                <Label
                  htmlFor={fields.note.id}
                  className="text-base sm:text-lg font-semibold"
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
                <FieldErrors errors={fields.note.errors} />
              </div>

              {/* タスク一覧 */}
              <div className="space-y-4">
                <Label className="text-base sm:text-lg font-semibold">
                  タスク
                </Label>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <TaskItem
                      key={task.key}
                      tasks={fields.tasks}
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
                <Label className="text-base sm:text-lg font-semibold">
                  URL
                </Label>
                <div className="space-y-4">
                  {urls.map((urlItem, index) => (
                    <UrlItem
                      key={urlItem.key}
                      urls={fields.urls}
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
      <div className="flex flex-row mt-6 sm:mt-8 justify-between w-full gap-4">
        {initialValues?.scheduleId &&
          (isDeleted ? (
            <RestoreScheduleButton scheduleId={initialValues.scheduleId} />
          ) : (
            <DeleteScheduleButton scheduleId={initialValues.scheduleId} />
          ))}
        <Button
          type="submit"
          className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto ml-0 sm:ml-auto"
          disabled={isPending}
        >
          {type === "edit" ? (
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

function TaskItem({ tasks, task, form, index }: TaskItemProps) {
  const { title, description, status, priority } = task.getFieldset();
  const { key: _1, ...statusProps } = getSelectProps(status);
  const { key: _2, ...priorityProps } = getSelectProps(priority);

  return (
    <Card className="p-3 sm:p-4 border rounded-lg shadow-sm space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            {...getInputProps(title, { type: "text" })}
            placeholder="タスクタイトル"
            key={title.key}
            className="w-full"
          />
          <FieldErrors errors={title.errors} />
        </div>
        <Button
          variant="outline"
          className="p-2 h-10 w-10 flex items-center justify-center"
          {...form.remove.getButtonProps({
            name: tasks.name,
            index: index,
          })}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
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
          <FieldErrors errors={status.errors} />
        </div>
        <div className="w-full sm:w-1/2">
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
          <FieldErrors errors={priority.errors} />
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
        <FieldErrors errors={description.errors} />
      </div>
    </Card>
  );
}

function UrlItem({ urls, urlItem, form, index }: UrlItemProps) {
  const { name, url } = urlItem.getFieldset();

  return (
    <Card className="p-3 sm:p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex-1 flex items-center gap-2 sm:block">
        <Input
          {...getInputProps(name, { type: "text" })}
          placeholder="名前"
          key={name.key}
          className="flex-1 sm:w-full mb-0 sm:mb-2"
        />
        <Button
          variant="outline"
          className="p-2 h-10 w-10 flex items-center justify-center sm:hidden"
          {...form.remove.getButtonProps({
            name: urls.name,
            index: index,
          })}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        <FieldErrors errors={name.errors} />
      </div>
      <div className="flex-1">
        <Input
          {...getInputProps(url, { type: "text" })}
          key={url.key}
          placeholder="URL"
          className="mb-2"
        />
        <FieldErrors errors={url.errors} />
      </div>
      <Button
        variant="outline"
        className="hidden sm:block w-full sm:w-auto mt-2 sm:mt-0"
        {...form.remove.getButtonProps({
          name: urls.name,
          index: index,
        })}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </Card>
  );
}
