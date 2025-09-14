/*
  Warnings:

  - Made the column `path` on table `AdminPermission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `method` on table `AdminPermission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdminPermission" ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "path" SET DEFAULT '',
ALTER COLUMN "method" SET NOT NULL;
