"use server";

import { createEventSchema, updateEventSchema } from "@/app/schedule/schemas";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { flash } from "@/utils/flash";
import { parseWithZod } from "@conform-to/zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import "server-only";

export async function addEvent(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createEventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const {
    title,
    description,
    startTime,
    endTime,
    urls,
    categoryId,
    note,
    tasks,
  } = submission.value;
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new AuthError();
    }
    await prisma.$transaction(async (prisma) => {
      return await prisma.schedule.create({
        data: {
          title,
          description,
          categoryId,
          startTime,
          endTime,
          userId,
          note,
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              userId,
              description: task.description,
              status: task.status,
              priority: task.priority
            })),
          },
          urls: {
            create: urls.map((url) => ({
              url: url.url,
              name: url.name,
            })),
          },
        },
      });
    });
    await flash("予定が追加されました！");
    redirect("/schedule/calendar");
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect("/auth/sign-in");
    }
    throw e;
  }
}

// export async function editEvent(_: unknown, formData: FormData) {
//   const submission = parseWithZod(formData, {
//     schema: updateEventSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const {
//     scheduleId,
//     title,
//     description,
//     startTime,
//     endTime,
//     urls,
//     categoryId,
//     note,
//     tasks,
//   } = submission.value;
//   try {
//     const session = await auth();
//     const userId = session?.user?.id;
//     if (!userId) {
//       throw new AuthError();
//     }
//     await prisma.$transaction(async (prisma) => {
//       const existingTasks = await prisma.task.findMany({
//         where: {
//           scheduleId,
//           userId,
//         },
//       });

//       const existingTaskIds = existingTasks.map(task => task.id);
//       const newTaskIds = tasks.map(task => task.id).filter(id => id);

//       const tasksToDelete = existingTaskIds.filter(id => !newTaskIds.includes(id));
//       const tasksToUpdate = tasks.filter(task => task.id && existingTaskIds.includes(task.id));
//       const tasksToCreate = tasks.filter(task => !task.id);

//       await prisma.task.deleteMany({
//         where: {
//           id: {
//         in: tasksToDelete,
//           },
//         },
//       });

//       await Promise.all(tasksToUpdate.map(task => 
//         prisma.task.update({
//           where: { id: task.id },
//           data: {
//         title: task.title,
//         description: task.description,
//         status: task.status || "TODO",
//           },
//         })
//       ));

//       await prisma.task.createMany({
//         data: tasksToCreate.map(task => ({
//           title: task.title,
//           userId,
//           description: task.description,
//           status: "TODO",
//           scheduleId,
//         })),
//       });

//       return await prisma.schedule.update({
//         where: {
//           id: scheduleId,
//         },
//         data: {
//           title,
//           description,
//           categoryId,
//           startTime,
//           endTime,
//           userId,
//           note,
//           urls: {
//         create: urls.map((url) => ({
//           url: url.url,
//           name: url.name,
//         })),
//           },
//         },
//       });
//     });
//     await flash("予定が追加されました！");
//     redirect("/schedule/calendar");
//   } catch (e) {
//     if (e instanceof AuthError) {
//       return redirect("/auth/sign-in");
//     }
//     throw e;
//   }
// }
