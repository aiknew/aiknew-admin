import { Module } from '@nestjs/common'
import { S3Controller } from './s3.controller'
import { S3Service } from './s3.service'
import { FileStorageModule } from '../file-storage/file-storage.module'
import { FileStorageService } from '../file-storage/file-storage.service'

@Module({
  imports: [FileStorageModule],
  controllers: [S3Controller],
  providers: [S3Service, FileStorageService],
  exports: [S3Service],
})
export class S3Module {}
