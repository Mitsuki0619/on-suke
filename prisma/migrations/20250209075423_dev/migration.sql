/*
  Warnings:

  - Made the column `startTime` on table `Schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;
