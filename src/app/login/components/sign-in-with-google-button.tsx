import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignInWithGoogleButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="w-full mt-2">
        Signin with Google
      </Button>
    </form>
  );
}
