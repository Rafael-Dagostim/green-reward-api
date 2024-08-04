/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "corporations" ALTER COLUMN "alternative_phone" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "social_media" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" DATE NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "alternative_phone" DROP NOT NULL,
ALTER COLUMN "social_media" DROP NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'PLAYER';

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");
