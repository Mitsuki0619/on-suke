import { editSchedule } from "@/features/schedule/actions/editSchedule";
import { fetchSchedule } from "@/features/schedule/actions/fetchSchedule";
import { ScheduleForm } from "@/features/schedule/components/ScheduleForm/ScheduleForm.server";
import { ScheduleFormModal } from "@/features/schedule/components/ScheduleFormModal/ScheduleFormModal";
import { formatInTimeZone } from "date-fns-tz";
import { Pencil } from "lucide-react";

export type EditSchedulePageParams = Promise<{
  scheduleId: string;
}>;

export async function EditSchedulePage({
  params,
  modal = false,
}: {
  params: EditSchedulePageParams;
  modal?: boolean;
}) {
  const { scheduleId } = await params;
  const schedule = await fetchSchedule(scheduleId);
  const initialValues = {
    scheduleId,
    title: schedule.title,
    categoryId: schedule.categoryId,
    description: schedule.description,
    startTime: formatInTimeZone(
      schedule.startTime,
      "Asia/Tokyo",
      "yyyy-MM-dd HH:mm:ss",
    ),
    endTime: formatInTimeZone(
      schedule.endTime,
      "Asia/Tokyo",
      "yyyy-MM-dd HH:mm:ss",
    ),
    note: schedule.note,
    tasks:
      schedule.tasks?.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      })) || [],
    urls:
      schedule.urls?.map((url) => ({
        id: url.id,
        name: url.name,
        url: url.url,
      })) || [],
  };

  if (modal) {
    return (
      <ScheduleFormModal type="edit">
        <ScheduleForm
          type="edit"
          eventMutateAction={editSchedule}
          initialValues={initialValues}
          isDeleted={schedule.deleted_at != null}
        />
      </ScheduleFormModal>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Pencil className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-950">予定の編集</h1>
      </div>
      <ScheduleForm
        type="edit"
        eventMutateAction={editSchedule}
        initialValues={initialValues}
        isDeleted={schedule.deleted_at != null}
      />
    </div>
  );
}
