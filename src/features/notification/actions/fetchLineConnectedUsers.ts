"use server";

import { LogicException } from "@/errors";
import prisma from "@/lib/prisma";
import "server-only";

export async function fetchLineConnectedUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      accounts: {
        select: {
          providerAccountId: true,
        },
        where: {
          provider: "line",
        },
      },
    },
    where: {
      accounts: {
        some: {
          provider: "line",
        },
      },
    },
  });

  const formattedUsers = users.map((user) => {
    const lineUserId = user.accounts.find(
      (account) => account.providerAccountId,
    )?.providerAccountId;
    if (lineUserId == null) {
      throw new LogicException("LINEが連携されていません");
    }
    return {
      id: user.id,
      lineUserId,
    };
  });

  return formattedUsers;
}
