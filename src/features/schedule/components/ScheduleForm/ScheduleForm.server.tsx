"use server";

import { fetchAllCategories } from "@/features/settings/actions/fetchAllCategories";
import { ScheduleFormClient } from "@/features/schedule/components/ScheduleForm/ScheduleForm.client";
import type { EditScheduleSchema } from "@/features/schedule/schemas/editScheduleSchema";
import type { SubmissionResult } from "@conform-to/react";

export async function ScheduleForm({
  type,
  initialValues,
  isDeleted,
  eventMutateAction,
}: {
  type: "add" | "edit";
  initialValues?: EditScheduleSchema;
  isDeleted?: boolean;
  eventMutateAction: (
    _: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
}) {
  const categories = await fetchAllCategories();
  return (
    <ScheduleFormClient
      type={type}
      categories={categories}
      initialValues={initialValues}
      isDeleted={isDeleted}
      eventMutateAction={eventMutateAction}
    />
  );
}
