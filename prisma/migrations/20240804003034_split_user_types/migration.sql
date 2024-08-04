/*
  Warnings:

  - The values [INSTITUTION,SPONSOR] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `corporations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `corporations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `corporations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[logo_id]` on the table `corporations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[file_id]` on the table `mission_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alternative_phone` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_name` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legal_name` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_media` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_points` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `corporations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CorporationType" AS ENUM ('INSTITUTION', 'SPONSOR');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('PLAYER', 'ADMIN');
ALTER TABLE "users" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "corporations" DROP CONSTRAINT "corporations_user_id_fkey";

-- DropIndex
DROP INDEX "corporations_user_id_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "street" TEXT;

-- AlterTable
ALTER TABLE "corporations" DROP COLUMN "name",
DROP COLUMN "user_id",
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "alternative_phone" TEXT NOT NULL,
ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "legal_name" TEXT NOT NULL,
ADD COLUMN     "logo_id" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "social_media" TEXT NOT NULL,
ADD COLUMN     "total_points" INTEGER NOT NULL,
ADD COLUMN     "type" "CorporationType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "corporations_address_id_key" ON "corporations"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "corporations_logo_id_key" ON "corporations"("logo_id");

-- CreateIndex
CREATE UNIQUE INDEX "mission_details_file_id_key" ON "mission_details"("file_id");

-- AddForeignKey
ALTER TABLE "corporations" ADD CONSTRAINT "corporations_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corporations" ADD CONSTRAINT "corporations_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "stored_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
