/*
  Warnings:

  - You are about to drop the column `user_cpf` on the `corporations` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `corporations` table. All the data in the column will be lost.
  - Added the required column `responsible_document` to the `corporations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_name` to the `corporations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "corporations" DROP COLUMN "user_cpf",
DROP COLUMN "user_name",
ADD COLUMN     "responsible_document" TEXT NOT NULL,
ADD COLUMN     "responsible_name" TEXT NOT NULL;
