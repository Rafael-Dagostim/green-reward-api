/*
  Warnings:

  - You are about to drop the column `total_count` on the `awards` table. All the data in the column will be lost.
  - Added the required column `redeem_quantity` to the `awards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "awards" DROP COLUMN "total_count",
ADD COLUMN     "redeem_quantity" INTEGER NOT NULL;
