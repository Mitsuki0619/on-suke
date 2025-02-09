import { editEvent } from "@/app/schedule/[scheduleId]/edit/actions";
import { fetchSchedule } from "@/app/schedule/[scheduleId]/loaders";
import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface Params {
  scheduleId: string;
}

export default async function EditSchedulePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { scheduleId } = await params;
  const schedule = await fetchSchedule(scheduleId);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">予定の編集</h1>
      <Card>
        <CardContent>
          <ScheduleEventForm
            eventMutateAction={editEvent}
            initialValues={{
              scheduleId,
              title: schedule.title,
              categoryId: schedule.categoryId,
              description: schedule.description,
              startTime: format(schedule.startTime, "yyyy-MM-dd HH:mm:ss"),
              endTime: format(schedule.endTime, "yyyy-MM-dd HH:mm:ss"),
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
        </CardContent>
      </Card>
    </div>
  );
}
