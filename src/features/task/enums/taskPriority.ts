import { TaskPriority } from "@prisma/client/edge";

const TaskPriorityLabels: Record<TaskPriority, string> = {
  LOW: "低",
  MEDIUM: "中",
  HIGH: "高",
  URGENT: "緊急",
};

export const taskPriorityOptions = Object.entries(TaskPriorityLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const TaskPriorityEnum = Object.keys(TaskPriority) as [
  TaskPriority,
  ...TaskPriority[],
];
