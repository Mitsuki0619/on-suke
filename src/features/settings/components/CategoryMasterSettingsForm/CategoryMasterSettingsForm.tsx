"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { FetchAllCategoriesReturnType } from "@/features/settings/actions/fetchAllCategories";
import { updateCategories } from "@/features/settings/actions/updateCategories";
import {
  type UpdateCategoriesSchema,
  updateCategoriesSchema,
} from "@/features/settings/schemas/updateCategoriesSchema";
import {
  type FieldMetadata,
  type FormMetadata,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon, CheckCircle, Plus } from "lucide-react";
import { getRandomColor } from "@/utils/getRandomColor";
import { FieldErrors } from "@/components/ui/field-error";

export function CategoryMasterSettingsForm({
  categories,
}: {
  categories: FetchAllCategoriesReturnType;
}) {
  "use no memo";
  const [lastResult, action, isPending] = useActionState(
    updateCategories,
    undefined,
  );
  const initialValues: UpdateCategoriesSchema = {
    items: categories.map((c) => ({
      id: c.id,
      name: c.name,
      color: c.color,
    })),
  };
  const [form, fields] = useForm({
    lastResult,
    defaultValue: initialValues,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: updateCategoriesSchema,
      });
    },
    shouldRevalidate: "onInput",
  });

  const categoryFields = fields.items.getFieldList();

  return (
    <div className="space-y-6">
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        key={form.key}
        className="space-y-6"
      >
        <ul className="space-y-4">
          {categoryFields.map((c, i) => (
            <CategoryInputItem
              form={form}
              categories={fields.items}
              category={c}
              index={i}
              key={c.key}
            />
          ))}
        </ul>
        <FieldErrors errors={fields.items.errors} className="mt-4" />
        <div>
          <Button
            variant="outline"
            className="w-full"
            {...form.insert.getButtonProps({
              name: fields.items.name,
              defaultValue: { name: "", color: getRandomColor() },
            })}
            disabled={fields.items.getFieldList().length > 7}
          >
            <Plus className="mr-2 h-4 w-4" />
            カテゴリを追加（最大8個）
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3"
            disabled={isPending}
          >
            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            保存
          </Button>
        </div>
      </form>
    </div>
  );
}

type FormError = string[];

function CategoryInputItem({
  form,
  categories,
  category,
  index,
}: {
  form: FormMetadata<UpdateCategoriesSchema, FormError>;
  categories: FieldMetadata<UpdateCategoriesSchema["items"]>;
  category: FieldMetadata<UpdateCategoriesSchema["items"][number]>;
  index: number;
}) {
  const { id, name, color } = category.getFieldset();
  const [previewState, setPreviewState] = useState({
    name: name.initialValue,
    color: color.initialValue,
  });
  return (
    <li className="flex items-start gap-2 sm:gap-4 w-full">
      {id.value != null && (
        <input type="hidden" value={id.value} name={id.name} />
      )}
      <div className="flex-grow grid grid-cols-[1fr,auto] sm:grid-cols-[1fr,auto,150px] gap-2 items-start w-full">
        <div className="w-full">
          <Input
            {...getInputProps(name, { type: "text" })}
            placeholder="カテゴリ名"
            key={name.key}
            onChange={(e) =>
              setPreviewState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full"
          />
          <FieldErrors errors={name.errors} />
        </div>
        <div className="w-12">
          <Input
            {...getInputProps(color, { type: "color" })}
            key={color.key}
            onChange={(e) =>
              setPreviewState((prev) => ({ ...prev, color: e.target.value }))
            }
            className="w-12 h-10 p-1 rounded"
          />
          <FieldErrors errors={color.errors} />
        </div>
        <div className="h-10 items-center justify-center hidden sm:flex">
          <Badge className="truncate max-w-full" color={previewState.color}>
            {previewState.name || "カテゴリ"}
          </Badge>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        {...form.remove.getButtonProps({
          name: categories.name,
          index: index,
        })}
        className="flex-shrink-0 h-10"
        aria-label="Remove category"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </li>
  );
}
