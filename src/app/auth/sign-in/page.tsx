import { signInWithGoogle, signInWithLINE } from "@/app/auth/sign-in/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export default function SignInPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-[350px] shadow-lg border border-orange-200 dark:border-orange-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            ログイン
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="w-full" action={signInWithGoogle}>
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Icons.google className="w-6 h-6 mr-2" />
              Googleでログイン
            </Button>
          </form>
          <form className="w-full" action={signInWithLINE}>
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-semibold transition-colors hover:bg-[#06C755] hover:text-white"
            >
              <Icons.line className="w-6 h-6 mr-2" />
              LINEでログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
