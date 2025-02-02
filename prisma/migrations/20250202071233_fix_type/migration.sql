/*
  Warnings:

  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ScheduleCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ScheduleCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ScheduleUrls` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ScheduleCategory" DROP CONSTRAINT "ScheduleCategory_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleCategories" DROP CONSTRAINT "_ScheduleCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleUrls" DROP CONSTRAINT "_ScheduleUrls_A_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_schedule_id_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schedule_id_seq";

-- AlterTable
ALTER TABLE "ScheduleCategory" DROP CONSTRAINT "ScheduleCategory_pkey",
ALTER COLUMN "scheduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ScheduleCategory_pkey" PRIMARY KEY ("scheduleId", "categoryId");

-- AlterTable
ALTER TABLE "_ScheduleCategories" DROP CONSTRAINT "_ScheduleCategories_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ScheduleCategories_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_ScheduleUrls" DROP CONSTRAINT "_ScheduleUrls_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ScheduleUrls_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "schedule_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ScheduleCategory" ADD CONSTRAINT "ScheduleCategory_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleUrls" ADD CONSTRAINT "_ScheduleUrls_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleCategories" ADD CONSTRAINT "_ScheduleCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
