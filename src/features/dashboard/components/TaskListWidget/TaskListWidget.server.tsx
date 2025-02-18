import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRecentlyTasks } from "@/features/task/actions/fetchRecentlyTasks";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AlertCircle, CheckCircle, Clock, List } from "lucide-react";
import Link from "next/link";

export async function TaskListWidget() {
  const tasks = await fetchRecentlyTasks();

  if (!tasks) {
    return (
      <Card className="h-full overflow-y-scroll bg-gradient-to-br from-orange-50 to-amber-100 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-amber-300 py-2">
          <CardTitle className="text-2xl font-bold text-white">
            タスク一覧
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-orange-600">タスクを読み込めませんでした。</p>
        </CardContent>
      </Card>
    );
  }

  const taskSections = [
    {
      title: "今日の締め切り",
      tasks: tasks.todayDeadlineTasks,
      icon: <Clock className="text-orange-500" />,
    },
    {
      title: "明日の締め切り",
      tasks: tasks.tomorrowDeadlineTasks,
      icon: <Clock className="text-amber-500" />,
    },
    {
      title: "期限切れ",
      tasks: tasks.expiredTasks,
      icon: <AlertCircle className="text-red-500" />,
    },
    {
      title: "その他の直近締切のタスク",
      tasks: tasks.otherTasks,
      icon: <List className="text-green-400" />,
    },
  ];

  const formatDeadline = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `今日 ${format(date, "H:mm", { locale: ja })}まで`;
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return `明日 ${format(date, "H:mm", { locale: ja })}まで`;
    }
    return `${format(date, "M月d日 H:mm", { locale: ja })}まで`;
  };

  return (
    <Card className="h-full overflow-y-scroll bg-gradient-to-br from-orange-50 to-amber-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-amber-300 py-2 sticky top-0">
        <CardTitle className="text-2xl font-bold text-white">
          直近タスク一覧
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        {taskSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-lg font-semibold text-orange-700 flex items-center gap-2">
              {section.icon}
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.tasks.length === 0 ? (
                <li className="text-gray-500">タスクはありません</li>
              ) : (
                section.tasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/schedule/${task.schedule.id}/edit`}
                      className="block"
                    >
                      <Card className="hover:bg-orange-100 transition-colors duration-200">
                        <CardContent className="p-3">
                          {task.schedule && (
                            <div className="text-xs text-orange-400 mb-1">
                              {task.schedule.title}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <CheckCircle
                              className="text-orange-400 flex-shrink-0"
                              size={16}
                            />
                            <span className="flex-grow text-orange-600">
                              {task.title}
                            </span>
                            {task.endTime && (
                              <span className="text-sm text-orange-500 whitespace-nowrap">
                                {formatDeadline(new Date(task.endTime))}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
