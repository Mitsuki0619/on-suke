import { ScheduleCalendar } from "@/app/schedule/calendar/components/ScheduleCalendar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

// 仮のイベントデータ
const events = [
  {
    id: 1,
    title: "ミーティング",
    start: new Date(2023, 5, 15, 10, 0),
    end: new Date(2023, 5, 15, 11, 0),
  },
  {
    id: 2,
    title: "昼食",
    start: new Date(2023, 5, 15, 12, 0),
    end: new Date(2023, 5, 15, 13, 0),
  },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">カレンダー</h1>
      <Button className="mb-4" asChild>
        <Link href="/schedule/add">
          <PlusCircle />
          予定を追加
        </Link>
      </Button>
      <ScheduleCalendar events={events} />
    </div>
  );
}
