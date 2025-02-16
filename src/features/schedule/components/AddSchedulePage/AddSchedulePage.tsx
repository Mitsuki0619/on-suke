import { addSchedule } from "@/features/schedule/actions/addSchedule";
import { ScheduleForm } from "@/features/schedule/components/ScheduleForm/ScheduleForm.server";
import { ScheduleFormModal } from "@/features/schedule/components/ScheduleFormModal/ScheduleFormModal";
import { Calendar, PlusCircle } from "lucide-react";

export function AddSchedulePage({ modal = false }: { modal?: boolean }) {
  if (modal) {
    return (
      <ScheduleFormModal type="add">
        <ScheduleForm type="add" eventMutateAction={addSchedule} />
      </ScheduleFormModal>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <PlusCircle className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-950">予定の登録</h1>
      </div>
      <ScheduleForm type="add" eventMutateAction={addSchedule} />
    </div>
  );
}
