-- CreateTable
CREATE TABLE "notification_methods" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "notification_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification_methods" ADD CONSTRAINT "notification_methods_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
