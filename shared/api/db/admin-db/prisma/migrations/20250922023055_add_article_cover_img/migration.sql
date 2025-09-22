-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "coverImageId" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "UploadFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
