import { TaskStatus } from "@prisma/client/edge";

const TaskStatusLabels: Record<TaskStatus, string> = {
  TODO: "未対応",
  WIP: "対応中",
  DONE: "完了",
  PENDING: "保留",
  ABOLISHED: "廃止",
};

export const taskStatusOptions = Object.entries(TaskStatusLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const TaskStatusEnum = Object.keys(TaskStatus) as [
  TaskStatus,
  ...TaskStatus[],
];
