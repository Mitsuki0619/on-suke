import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>今日の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <p>予定の内容がここに表示されます。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>今週の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <p>今週の予定の概要がここに表示されます。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>事前準備が必要な予定</CardTitle>
          </CardHeader>
          <CardContent>
            <p>準備が必要な予定のリストがここに表示されます。</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>今週の天気</CardTitle>
          </CardHeader>
          <CardContent>
            <p>天気予報の情報がここに表示されます。</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
