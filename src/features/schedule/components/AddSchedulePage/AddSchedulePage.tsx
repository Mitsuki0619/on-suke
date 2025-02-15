import { addSchedule } from "@/features/schedule/actions/addSchedule";
import { ScheduleForm } from "@/features/schedule/components/ScheduleForm/ScheduleForm.server";
import { ScheduleFormModal } from "@/features/schedule/components/ScheduleFormModal/ScheduleFormModal";

export function AddSchedulePage({ modal = false }: { modal?: boolean }) {
  if (modal) {
    return (
      <ScheduleFormModal type="add">
        <ScheduleForm type="add" eventMutateAction={addSchedule} />
      </ScheduleFormModal>
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">予定の登録</h1>
      <ScheduleForm type="add" eventMutateAction={addSchedule} />
    </div>
  );
}
