import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Video, FileText } from "lucide-react";

const scheduleData = [
  { time: "09:00", event: "朝会", icon: Users },
  { time: "11:00", event: "クライアントミーティング", icon: Video },
  { time: "14:00", event: "プロジェクトレビュー", icon: FileText },
  { time: "16:30", event: "週次報告", icon: Calendar },
];

export default function TodaySchedule() {
  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-theme-orange-600">
          今日の予定
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {scheduleData.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-theme-orange-100 transition-colors duration-200"
              >
                <Icon className="w-6 h-6 text-theme-orange-500" />
                <span className="font-medium text-theme-orange-700">
                  {item.time}
                </span>
                <span className="flex-grow text-gray-700">{item.event}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
