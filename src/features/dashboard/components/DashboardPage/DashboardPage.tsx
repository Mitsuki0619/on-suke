import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ClockWidget } from "@/features/dashboard/components/ClockWidget/ClockWidget";
import { TaskListWidget } from "@/features/dashboard/components/TaskListWidget/TaskListWidget.server";
import { TodaysSchedulesWidgetClient } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.client";
import { TodaysSchedulesWidget } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.server";
import { WeatherWidget } from "@/features/dashboard/components/WeatherWidget/WeatherWidget";
import { Suspense } from "react";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Suspense
            fallback={
              <LoadingOverlay isLoading message="Loading...">
                <TodaysSchedulesWidgetClient todaysSchedules={[]} />
              </LoadingOverlay>
            }
          >
            <TodaysSchedulesWidget />
          </Suspense>
        </div>
        <div>
          <Suspense>
            <TaskListWidget />
          </Suspense>
        </div>
        <div className="md:col-span-2">
          <Suspense>
            <WeatherWidget />
          </Suspense>
        </div>
        <div>
          <Suspense>
            <ClockWidget />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
