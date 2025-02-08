"use client";

import { Button } from "@/components/ui/button";
import type { NavigateAction, View } from "react-big-calendar";

interface Props {
  label: string;
  onNavigate: (action: NavigateAction) => void;
  onView: (view: View) => void;
}

export function SchedulerToolbar(toolbar: Props) {
  const navigate = (action: NavigateAction) => {
    toolbar.onNavigate(action);
  };

  const viewNames: Record<Extract<View, "month" | "week" | "day">, string> = {
    month: "月",
    week: "週",
    day: "日",
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate("PREV")}>
          前へ
        </Button>
        <Button variant="outline" onClick={() => navigate("TODAY")}>
          今日
        </Button>
        <Button variant="outline" onClick={() => navigate("NEXT")}>
          次へ
        </Button>
      </div>
      <div className="text-3xl font-semibold">{toolbar.label}</div>
      <div className="flex items-center gap-2">
        {Object.entries(viewNames).map(([key, label]) => (
          <Button
            key={key}
            variant="outline"
            onClick={() => toolbar.onView(key as View)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
