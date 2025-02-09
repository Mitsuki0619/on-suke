import { addEvent } from "@/app/schedule/add/actions";
import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import { Card, CardContent } from "@/components/ui/card";

export default function AddSchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">予定の登録</h1>
      <Card>
        <CardContent>
          <ScheduleEventForm eventMutateAction={addEvent} />
        </CardContent>
      </Card>
    </div>
  );
}
