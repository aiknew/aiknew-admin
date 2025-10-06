import { Module } from '@nestjs/common'
import { FileService } from './upload-file.service'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { diskStorage } from 'multer'
import { extname } from 'node:path'
import { randomBytes } from 'node:crypto'
import { I18nContext } from 'nestjs-i18n'
import { UploadFileGroupModule } from '../upload-file-group/upload-file-group.module'
import { UploadFileController } from './upload-file.controller'
import { UploadFileGroupService } from '../upload-file-group/upload-file-group.service'
import { type Request } from 'express'
import { FileStorageModule } from '../file-storage/file-storage.module'
import { FileStorageService } from '../file-storage/file-storage.service'
import { S3Module } from '../s3/s3.module'
import { S3Service } from '../s3/s3.service'

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('common.publicFileFolder'),
          filename: function (req, file, cb) {
            const fileExt = extname(file.originalname)
            randomBytes(16, function (err, raw) {
              if (err) {
                throw new Error(
                  I18nContext.current()?.t('upload-file.generateFileNameErr', {
                    args: { fileName: file.originalname },
                    lang: I18nContext.current()?.lang,
                  }),
                )
              }
              cb(null, raw.toString('hex') + fileExt)
            })
          },
        }),
        fileFilter(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, acceptFile: boolean) => void,
        ) {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          )
          callback(null, true)
        },
      }),
    }),
    UploadFileGroupModule,
    FileStorageModule,
    S3Module,
  ],
  controllers: [UploadFileController],
  providers: [
    FileService,
    UploadFileGroupService,
    FileStorageService,
    S3Service,
  ],
})
export class UploadFileModule { }
