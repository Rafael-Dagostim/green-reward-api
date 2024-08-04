/*
  Warnings:

  - You are about to drop the column `total_count` on the `missions` table. All the data in the column will be lost.
  - Added the required column `total_call` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "missions" DROP COLUMN "total_count",
ADD COLUMN     "total_call" INTEGER NOT NULL;
