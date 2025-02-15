"use client";

import { Button } from "@/components/ui/button";
import type { NavigateAction, View } from "react-big-calendar";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Props {
  label: string;
  onNavigate: (action: NavigateAction) => void;
  onView: (view: View) => void;
  view: View;
}

export function ScheduleCalendarToolBar(toolbar: Props) {
  const navigate = (action: NavigateAction) => {
    toolbar.onNavigate(action);
  };

  const viewNames: Record<Extract<View, "month" | "week" | "day">, string> = {
    month: "月",
    week: "週",
    day: "日",
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => navigate("PREV")}
          className="text-theme-orange-600 hover:bg-theme-orange-100 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("TODAY")}
          className="text-theme-orange-600 hover:bg-theme-orange-100 transition-colors duration-200"
        >
          <Calendar className="w-5 h-5 mr-1" />
          今日
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("NEXT")}
          className="text-theme-orange-600 hover:bg-theme-orange-100 transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="text-3xl font-bold text-theme-orange-600 bg-theme-orange-100 px-4 py-2 rounded-full shadow-sm">
        {toolbar.label}
      </div>
      <div className="flex items-center gap-2">
        {Object.entries(viewNames).map(([key, label]) => (
          <Button
            key={key}
            variant={toolbar.view === key ? "default" : "outline"}
            onClick={() => toolbar.onView(key as View)}
            className={`transition-all duration-200 ${
              toolbar.view === key
                ? "bg-theme-orange-500 text-white hover:bg-theme-orange-600"
                : "text-theme-orange-600 hover:bg-theme-orange-100"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
