import { FlashMessageClient } from "@/components/functional/FlashMessage/flash-message.client";
import { cookies } from "next/headers";

export async function FlashMessage() {
  const flash = (await cookies()).get("flash")?.value;

  return <FlashMessageClient flash={flash} />;
}
