import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

const weatherIcons = {
  Sun: Sun,
  Cloud: Cloud,
  CloudRain: CloudRain,
  CloudSnow: CloudSnow,
  CloudLightning: CloudLightning,
};

const weatherData = [
  { day: "日", icon: "Sun", temp: 26 },
  { day: "月", icon: "Cloud", temp: 25 },
  { day: "火", icon: "CloudRain", temp: 22 },
  { day: "水", icon: "CloudLightning", temp: 20 },
  { day: "木", icon: "Sun", temp: 24 },
  { day: "金", icon: "CloudSnow", temp: 18 },
  { day: "土", icon: "Cloud", temp: 23 },
];

const getWeatherColor = (temp: number) => {
  if (temp >= 25) return "text-theme-orange-600";
  if (temp >= 20) return "text-theme-orange-500";
  if (temp >= 15) return "text-theme-orange-400";
  return "text-blue-400";
};

export function Weather() {
  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-theme-orange-600">
          今週の天気
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {weatherData.map((day) => {
            const Icon = weatherIcons[day.icon as keyof typeof weatherIcons];
            return (
              <div key={day.day} className="text-center">
                <div className="font-bold text-lg">{day.day}</div>
                <div className="my-2">
                  <Icon className="w-10 h-10 mx-auto text-theme-orange-500" />
                </div>
                <div
                  className={`text-lg font-semibold ${getWeatherColor(
                    day.temp,
                  )}`}
                >
                  {day.temp}°C
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
