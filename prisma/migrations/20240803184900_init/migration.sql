-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('F', 'J');

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "post_code" VARCHAR(10) NOT NULL,
    "country" VARCHAR(60) NOT NULL,
    "state" VARCHAR(100),
    "city" VARCHAR(100) NOT NULL,
    "street" TEXT NOT NULL,
    "number" VARCHAR(10),
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
