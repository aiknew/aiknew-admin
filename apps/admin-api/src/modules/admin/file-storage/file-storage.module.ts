import { forwardRef, Module } from "@nestjs/common"
import { FileStorageController } from "./file-storage.controller"
import { FileStorageService } from "./file-storage.service"
import { UploadFileModule } from "../upload-file/upload-file.module"

@Module({
  imports: [forwardRef(() => UploadFileModule)],
  controllers: [FileStorageController],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
