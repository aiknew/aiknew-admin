/*
  Warnings:

  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArticleCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArticleCategoryTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArticleTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_articleCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleCategoryTranslation" DROP CONSTRAINT "ArticleCategoryTranslation_articleCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_articleId_fkey";

-- AlterTable
ALTER TABLE "AdminRoute" ALTER COLUMN "parentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP DEFAULT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "articleCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Article_id_seq";

-- AlterTable
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP DEFAULT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ArticleCategory_id_seq";

-- AlterTable
ALTER TABLE "ArticleCategoryTranslation" DROP CONSTRAINT "ArticleCategoryTranslation_pkey",
ALTER COLUMN "articleCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArticleCategoryTranslation_pkey" PRIMARY KEY ("articleCategoryId", "langKey");

-- AlterTable
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_pkey",
ALTER COLUMN "articleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArticleTranslation_pkey" PRIMARY KEY ("articleId", "langKey");

-- AlterTable
ALTER TABLE "UploadFile" ALTER COLUMN "groupId" DROP NOT NULL,
ALTER COLUMN "groupId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UploadFileGroup" ALTER COLUMN "parentId" DROP NOT NULL,
ALTER COLUMN "parentId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "ArticleCategoryTranslation" ADD CONSTRAINT "ArticleCategoryTranslation_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
