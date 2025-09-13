/*
  Warnings:

  - Made the column `remark` on table `DictTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `DictTypeTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."DictTranslation" ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."DictTypeTranslation" ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '';

-- CreateTable
CREATE TABLE "public"."LoginLog" (
    "id" TEXT NOT NULL,
    "userName" VARCHAR(20) NOT NULL DEFAULT '',
    "userId" VARCHAR(50) NOT NULL DEFAULT '',
    "ip" VARCHAR(45) NOT NULL,
    "location" VARCHAR(100) NOT NULL DEFAULT '',
    "userAgent" VARCHAR(500) NOT NULL DEFAULT '',
    "os" VARCHAR(50) NOT NULL DEFAULT '',
    "browser" VARCHAR(50) NOT NULL DEFAULT '',
    "isSuccess" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginLog_pkey" PRIMARY KEY ("id")
);
