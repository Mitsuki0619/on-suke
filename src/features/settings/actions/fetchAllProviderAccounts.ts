import { checkAuth } from "@/features/auth/actions/checkAuth";
import prisma from "@/lib/prisma";

export async function fetchAllProviderAccounts() {
  const { user } = await checkAuth();
  const accounts = await prisma.account.findMany({
    select: {
      provider: true,
    },
    where: {
      userId: user.id,
    },
  });

  const providers = accounts.map((account) => account.provider);
  return providers;
}

export type FetchAllProviderAccountsReturnType = Awaited<
  ReturnType<typeof fetchAllProviderAccounts>
>;
