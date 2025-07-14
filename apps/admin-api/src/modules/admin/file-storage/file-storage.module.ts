import { Module } from '@nestjs/common'
import { FileStorageController } from './file-storage.controller'
import { FileStorageService } from './file-storage.service'

@Module({
  imports: [],
  controllers: [FileStorageController],
  providers: [FileStorageService],
})
export class FileStorageModule {}
