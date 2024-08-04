/*
  Warnings:

  - You are about to drop the column `country` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `state` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "country",
DROP COLUMN "deleted_at",
DROP COLUMN "street",
ALTER COLUMN "state" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_address_id_key" ON "users"("address_id");
