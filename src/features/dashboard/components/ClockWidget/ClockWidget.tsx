"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return null; // Render nothing on the server
  }

  const days = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-300 py-2">
        <CardTitle className="text-2xl font-bold text-white">
          現在時刻
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-between p-8">
        {/* アナログ時計 */}
        <div className="relative w-44 h-44">
          {/* 時計の外枠 */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-300" />

          {/* 時間のマーカー */}
          {[...Array(12)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed array of 12 clock markers
              key={i}
              className="absolute w-1 h-4 bg-orange-300"
              style={{
                left: "50%",
                top: "0",
                transformOrigin: "50% 88px",
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}

          {/* 時針 */}
          <div
            className="absolute top-1/2 left-1/2 w-1.5 bg-orange-400 rounded-full"
            style={{
              height: "30%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -100%) rotate(${
                (time.getHours() % 12) * 30 + time.getMinutes() * 0.5
              }deg)`,
            }}
          />

          {/* 分針 */}
          <div
            className="absolute top-1/2 left-1/2 w-1 bg-orange-400 rounded-full"
            style={{
              height: "40%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -100%) rotate(${
                time.getMinutes() * 6
              }deg)`,
            }}
          />

          {/* 秒針 */}
          <div
            className="absolute top-1/2 left-1/2 w-0.5 bg-red-400 rounded-full"
            style={{
              height: "45%",
              transformOrigin: "50% 100%",
              transform: `translate(-50%, -100%) rotate(${
                time.getSeconds() * 6
              }deg)`,
            }}
          />

          {/* 時計の中心点 */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>

        <div className="space-y-6">
          {/* デジタル時計 */}
          <div className="text-5xl font-bold text-orange-500">
            {time.toLocaleTimeString("ja-JP", { hour12: false })}
          </div>

          {/* 日付 */}
          <div className="text-2xl font-medium text-orange-400">
            {`${time.getFullYear()}年${
              time.getMonth() + 1
            }月${time.getDate()}日 (${days[time.getDay()]})`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
