import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const taskData = [
  { id: 1, task: "レポート作成", completed: false },
  { id: 2, task: "プレゼン資料準備", completed: true },
  { id: 3, task: "会議室予約", completed: false },
  { id: 4, task: "予算確認", completed: false },
];

export function TaskListWidget() {
  return (
    <Card className="h-full bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-theme-orange-600">
          直近タスク一覧
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {taskData.map((item) => (
            <li
              key={item.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-theme-orange-100 transition-colors duration-200"
            >
              {item.task}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
