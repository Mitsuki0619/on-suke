"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="h-full flex flex-col bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-theme-orange-600">
          現在の時刻
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="text-5xl font-bold text-center text-theme-orange-500 animate-pulse">
          {time.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}
