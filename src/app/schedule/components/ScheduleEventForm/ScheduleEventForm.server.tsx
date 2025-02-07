"use server";

import { ScheduleEventFormClient } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.client";
import { fetchAllCategories } from "@/app/schedule/loaders";

export async function ScheduleEventForm() {
  const categories = await fetchAllCategories();
  return <ScheduleEventFormClient categories={categories} />;
}
