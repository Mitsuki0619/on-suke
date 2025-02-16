import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import { fetchAllProviderAccounts } from "@/features/settings/actions/fetchAllProviderAccounts";
import { DeleteAccountButton } from "@/features/settings/components/DeleteAccountButton/DeleteAccountButton";
import { LineConnectButton } from "@/features/settings/components/LineConnectButton/LineConnectButton";
import { User } from "lucide-react";

export async function UserSettingsPage() {
  const { user } = await checkAuth();
  const providers = await fetchAllProviderAccounts();

  const isLineConnected = providers.includes("line");
  const canDisconnectLine = isLineConnected && providers.length > 1;

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2 mb-6">
            <User className="h-6 w-6 text-orange-500" />
            <span className="text-2xl font-bold text-orange-950">
              ユーザー設定
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user?.image || "/placeholder.svg"}
              alt="プロフィール画像"
              width={96}
              height={96}
              className="rounded-full"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">ユーザー名</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              アカウント連携
            </h3>
            <div className="space-y-2">
              <LineConnectButton
                isLineConnected={isLineConnected}
                canDisconnectLine={canDisconnectLine}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <DeleteAccountButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
