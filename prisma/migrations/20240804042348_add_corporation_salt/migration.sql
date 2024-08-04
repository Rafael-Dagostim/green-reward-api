/*
  Warnings:

  - Added the required column `salt` to the `corporations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "corporations" ADD COLUMN     "salt" TEXT NOT NULL;
