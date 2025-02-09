"use server";

import { ScheduleEventFormClient } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.client";
import { fetchAllCategories } from "@/app/schedule/loaders";
import type { UpdateEventSchemaType } from "@/app/schedule/schemas";
import type { SubmissionResult } from "@conform-to/react";

export async function ScheduleEventForm({
  initialValues,
  eventMutateAction,
}: {
  initialValues?: UpdateEventSchemaType;
  eventMutateAction: (
    _: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
}) {
  const categories = await fetchAllCategories();
  return (
    <ScheduleEventFormClient
      categories={categories}
      initialValues={initialValues}
      eventMutateAction={eventMutateAction}
    />
  );
}
