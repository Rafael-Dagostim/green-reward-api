/*
  Warnings:

  - You are about to drop the `comporations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "awards" DROP CONSTRAINT "awards_sponsor_id_fkey";

-- DropForeignKey
ALTER TABLE "comporations" DROP CONSTRAINT "comporations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "missions" DROP CONSTRAINT "missions_intitution_id_fkey";

-- DropTable
DROP TABLE "comporations";

-- CreateTable
CREATE TABLE "corporations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "corporations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "corporations_user_id_key" ON "corporations"("user_id");

-- AddForeignKey
ALTER TABLE "corporations" ADD CONSTRAINT "corporations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_intitution_id_fkey" FOREIGN KEY ("intitution_id") REFERENCES "corporations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "corporations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
