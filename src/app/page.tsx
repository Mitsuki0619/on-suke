import { Clock } from "@/app/dashboard/components/clock";
import { TaskList } from "@/app/dashboard/components/task-list";
import TodaySchedule from "@/app/dashboard/components/today-schedule";
import { Weather } from "@/app/dashboard/components/weather";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Weather />
        </div>
        <div>
          <Clock />
        </div>
        <div className="md:col-span-2">
          <TodaySchedule />
        </div>
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
