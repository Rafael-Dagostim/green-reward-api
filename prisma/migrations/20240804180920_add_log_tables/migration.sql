-- AlterTable
ALTER TABLE "users" ALTER COLUMN "total_points" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "points_log" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mission_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points_transfer" (
    "id" SERIAL NOT NULL,
    "sponsor_id" INTEGER NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "points_log" ADD CONSTRAINT "points_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_log" ADD CONSTRAINT "points_log_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_transfer" ADD CONSTRAINT "points_transfer_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "corporations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_transfer" ADD CONSTRAINT "points_transfer_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "corporations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
