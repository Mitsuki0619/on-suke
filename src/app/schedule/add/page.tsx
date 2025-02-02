import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function AddSchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">予定の新規登録</h1>
      <Card>
        <CardContent>
          <ScheduleEventForm />
        </CardContent>
      </Card>
    </div>
  );
}
