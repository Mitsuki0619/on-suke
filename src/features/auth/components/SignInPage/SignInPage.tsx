import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { signInWithLINE } from "@/features/auth/actions/signInWithLine";
import { signInWithGoogle } from "@/features/auth/actions/singnInWithGoogle";

export function SignInPage() {
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
              type="submit"
              variant="outline"
              className="w-full py-6 text-lg font-semibold transition-all duration-200 ease-in-out bg-white text-black hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] group"
            >
              <Icons.google className="w-6 h-6 mr-2 transition-all duration-200 ease-in-out" />
              Googleでログイン
            </Button>
          </form>
          <form className="w-full" action={signInWithLINE}>
            <Button
              type="submit"
              variant="outline"
              className="w-full py-6 text-lg font-semibold transition-all duration-200 ease-in-out bg-white text-black hover:bg-[#06C755] hover:text-white hover:border-[#06C755] group"
            >
              <Icons.line className="w-6 h-6 mr-2 transition-all duration-200 ease-in-out text-[#06C755] group-hover:text-white" />
              LINEでログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
