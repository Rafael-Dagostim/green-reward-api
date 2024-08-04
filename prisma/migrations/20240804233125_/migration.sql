/*
  Warnings:

  - A unique constraint covering the columns `[missionId,tag]` on the table `mission_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mission_tags_missionId_tag_key" ON "mission_tags"("missionId", "tag");
