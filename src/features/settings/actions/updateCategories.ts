"use server";

import { LogicException } from "@/errors";
import { checkAuth } from "@/features/auth/actions/checkAuth";
import { updateCategoriesSchema } from "@/features/settings/schemas/updateCategoriesSchema";
import prisma from "@/lib/prisma";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { flash } from "@/utils/flash";

type CategoryInput = {
  id?: number;
  name: string;
  color: string;
};

export async function updateCategories(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: updateCategoriesSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const { items } = submission.value as { items: CategoryInput[] };
    const { user } = await checkAuth();

    await prisma.$transaction(async (tx) => {
      if (user.id == null) {
        throw new LogicException("ユーザーIDが見つかりません");
      }
      const master = await tx.master.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!master) {
        await tx.master.create({
          data: {
            userId: user.id,
            categories: {
              create: items,
            },
          },
        });
        return;
      }

      const existingCategories = await tx.category.findMany({
        where: { masterId: master.id },
        select: { id: true },
      });

      const removedCategoryIds = existingCategories
        .filter((category) => !items.some((item) => item.id === category.id))
        .map((category) => category.id);

      const newCategories = items.filter(
        (item) =>
          !item.id ||
          !existingCategories.some((category) => category.id === item.id),
      );

      const categoriesToUpdate = items.filter(
        (item) =>
          item.id &&
          existingCategories.some((category) => category.id === item.id),
      );

      // 削除
      if (removedCategoryIds.length > 0) {
        await tx.category.deleteMany({
          where: { id: { in: removedCategoryIds } },
        });
      }

      // 追加
      if (newCategories.length > 0) {
        await tx.category.createMany({
          data: newCategories.map(({ id, ...item }) => ({
            ...item,
            masterId: master.id,
          })),
        });
      }

      // 更新
      for (const category of categoriesToUpdate) {
        if (category.id) {
          await tx.category.update({
            where: { id: category.id },
            data: { name: category.name, color: category.color },
          });
        }
      }
    });
    await flash({ title: "カテゴリを保存しました！" });
    revalidatePath("/settings/master/category");
    return submission.reply({ resetForm: true });
  } catch (_e) {
    await flash({ title: "カテゴリの保存に失敗しました。" });
  }
}
