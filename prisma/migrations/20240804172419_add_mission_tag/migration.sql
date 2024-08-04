-- AlterTable
ALTER TABLE "users" ALTER COLUMN "total_points" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "mission_tags" (
    "id" SERIAL NOT NULL,
    "missionId" INTEGER NOT NULL,
    "tag" VARCHAR(50) NOT NULL,

    CONSTRAINT "mission_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mission_tags" ADD CONSTRAINT "mission_tags_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "missions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
