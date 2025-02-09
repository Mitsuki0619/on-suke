"use server";

import { ScheduleEventFormClient } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.client";
import { fetchAllCategories } from "@/app/schedule/loaders";
import type { SubmissionResult } from "@conform-to/react";

export async function ScheduleEventForm({
  serverAction,
}: {
  serverAction: (
    _: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
}) {
  const categories = await fetchAllCategories();
  return (
    <ScheduleEventFormClient
      categories={categories}
      type="add"
      serverAction={serverAction}
    />
  );
}
