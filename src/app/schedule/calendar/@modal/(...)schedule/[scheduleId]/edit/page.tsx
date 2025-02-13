import { editEvent } from "@/app/schedule/[scheduleId]/edit/actions";
import { fetchSchedule } from "@/app/schedule/[scheduleId]/loaders";
import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import ScheduleEventFormModal from "@/app/schedule/components/ScheduleEventFormModal/ScheduleEventFormModal";
import { formatInTimeZone } from "date-fns-tz";

interface Params {
  scheduleId: string;
}

export default async function EditScheduleModal({
  params,
}: {
  params: Promise<Params>;
}) {
  const { scheduleId } = await params;
  const schedule = await fetchSchedule(scheduleId);
  return (
    <>
      <ScheduleEventFormModal type="edit">
        <ScheduleEventForm
          type="edit"
          eventMutateAction={editEvent}
          initialValues={{
            scheduleId,
            title: schedule.title,
            categoryId: schedule.categoryId,
            description: schedule.description,
            startTime: formatInTimeZone(
              schedule.startTime,
              "Asia/Tokyo",
              "yyyy-MM-dd HH:mm:ss"
            ),
            endTime: formatInTimeZone(
              schedule.endTime,
              "Asia/Tokyo",
              "yyyy-MM-dd HH:mm:ss"
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
          }}
        />
      </ScheduleEventFormModal>
    </>
  );
}
