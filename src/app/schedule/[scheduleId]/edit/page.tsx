import { fetchSchedule } from "@/app/schedule/[scheduleId]/loaders";
import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import { Card, CardContent } from "@/components/ui/card";

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
          <ScheduleEventForm />
        </CardContent>
      </Card>
    </div>
  );
}
