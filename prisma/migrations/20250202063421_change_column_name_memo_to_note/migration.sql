/*
  Warnings:

  - You are about to drop the column `memo` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "memo",
ADD COLUMN     "note" TEXT;
