import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Weather() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-300 py-2">
        <CardTitle className="text-2xl font-bold text-white">
          今週の天気
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300">
            <iframe
              src="https://www.sunny-spot.net/get_fcst/parts_fcst.php?ID=6200&CL=ORANGE"
              title="today's weather"
              className="w-full h-64 sm:h-80 border-none"
            />
          </div>
          <div className="w-full sm:w-2/3 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300">
            <iframe
              src="https://www.sunny-spot.net/get_fcst/parts_week.php?ID=276280&CL=ORANGE"
              title="week's weather"
              className="w-full h-64 sm:h-80 border-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
