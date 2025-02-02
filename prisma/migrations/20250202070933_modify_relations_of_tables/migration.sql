/*
  Warnings:

  - The primary key for the `_ScheduleCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ScheduleUrls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `A` on the `_ScheduleCategories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_ScheduleCategories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_ScheduleUrls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `schedule_id` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `task_id` on the `timelines` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleCategories" DROP CONSTRAINT "_ScheduleCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleCategories" DROP CONSTRAINT "_ScheduleCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleUrls" DROP CONSTRAINT "_ScheduleUrls_A_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "timelines" DROP CONSTRAINT "timelines_task_id_fkey";

-- AlterTable
ALTER TABLE "_ScheduleCategories" DROP CONSTRAINT "_ScheduleCategories_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_ScheduleCategories_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_ScheduleUrls" DROP CONSTRAINT "_ScheduleUrls_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_ScheduleUrls_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "schedule_id",
ADD COLUMN     "schedule_id" INTEGER NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "timelines" DROP COLUMN "task_id",
ADD COLUMN     "task_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "schedules";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleCategory" (
    "scheduleId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ScheduleCategory_pkey" PRIMARY KEY ("scheduleId","categoryId")
);

-- CreateIndex
CREATE INDEX "_ScheduleCategories_B_index" ON "_ScheduleCategories"("B");

-- AddForeignKey
ALTER TABLE "ScheduleCategory" ADD CONSTRAINT "ScheduleCategory_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCategory" ADD CONSTRAINT "ScheduleCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleUrls" ADD CONSTRAINT "_ScheduleUrls_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleCategories" ADD CONSTRAINT "_ScheduleCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleCategories" ADD CONSTRAINT "_ScheduleCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
