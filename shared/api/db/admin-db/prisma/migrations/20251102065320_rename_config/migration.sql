/*
  Warnings:

  - You are about to drop the `Config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConfigTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConfigTranslation" DROP CONSTRAINT "ConfigTranslation_configId_fkey";

-- DropForeignKey
ALTER TABLE "ConfigTranslation" DROP CONSTRAINT "ConfigTranslation_langKey_fkey";

-- DropTable
DROP TABLE "Config";

-- DropTable
DROP TABLE "ConfigTranslation";

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "builtIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemConfigTranslation" (
    "configId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SystemConfigTranslation_pkey" PRIMARY KEY ("configId","langKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_key_key" ON "SystemConfig"("key");

-- AddForeignKey
ALTER TABLE "SystemConfigTranslation" ADD CONSTRAINT "SystemConfigTranslation_configId_fkey" FOREIGN KEY ("configId") REFERENCES "SystemConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemConfigTranslation" ADD CONSTRAINT "SystemConfigTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
