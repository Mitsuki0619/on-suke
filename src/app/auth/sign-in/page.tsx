import { signInWithGoogle } from "@/app/auth/sign-in/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center pt-72">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-md text-center">ログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="w-full" action={signInWithGoogle}>
            <Button variant="outline" className="w-full mt-2">
              <Icons.google className="w-5 h-5 mr-2" />
              Signin with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
