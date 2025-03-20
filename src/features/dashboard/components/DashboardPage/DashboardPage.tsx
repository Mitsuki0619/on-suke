import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ClockWidget } from "@/features/dashboard/components/ClockWidget/ClockWidget";
import { TaskListWidget } from "@/features/dashboard/components/TaskListWidget/TaskListWidget.server";
import { TodaysSchedulesWidgetClient } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.client";
import { TodaysSchedulesWidget } from "@/features/dashboard/components/TodaysSchedulesWidget/TodaysSchedulesWidget.server";
import { WeatherWidget } from "@/features/dashboard/components/WeatherWidget/WeatherWidget";
import { LayoutDashboard } from "lucide-react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-950">ダッシュボード</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[562px]">
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
        <div className="h-[562px]">
          <Suspense
            fallback={
              <LoadingOverlay isLoading message="Loading...">
                <Card className="h-[562px] bg-gradient-to-br from-orange-50 to-amber-100 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-orange-400 to-amber-300 py-2">
                    <CardTitle className="text-2xl font-bold text-white">
                      タスク一覧
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-full">
                    {" "}
                  </CardContent>
                </Card>
              </LoadingOverlay>
            }
          >
            <TaskListWidget />
          </Suspense>
        </div>
        <div className="lg:col-span-2">
          <WeatherWidget />
        </div>
        <div>
          <ClockWidget />
        </div>
      </div>
    </div>
  );
}
