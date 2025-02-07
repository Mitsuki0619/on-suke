import { ScheduleEventForm } from "@/app/schedule/components/ScheduleEventForm/ScheduleEventForm.server";
import ScheduleEventFormModal from "@/app/schedule/components/ScheduleEventFormModal/ScheduleEventFormModal";

export default function AddScheduleModal() {
  return (
    <>
      <ScheduleEventFormModal>
        <ScheduleEventForm />
      </ScheduleEventFormModal>
    </>
  );
}
