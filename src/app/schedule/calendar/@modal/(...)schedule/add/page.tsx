import { addEvent } from "@/app/schedule/add/actions";
import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import ScheduleEventFormModal from "@/app/schedule/components/ScheduleEventFormModal/ScheduleEventFormModal";

export default function AddScheduleModal() {
  return (
    <>
      <ScheduleEventFormModal type="add">
        <ScheduleEventForm eventMutateAction={addEvent} />
      </ScheduleEventFormModal>
    </>
  );
}
