import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { LanguageModule } from './language/language.module'
import { AdminUserModule } from './admin-user/admin-user.module'
import { AdminAuthModule } from './admin-auth/admin-auth.module'
import { AuthApiModule } from './auth-api/auth-api.module'
import { AdminRoleModule } from './admin-role/admin-role.module'
import { AdminRouteModule } from './admin-route/admin-route.module'
import { SystemSettingModule } from './system-setting/system-setting.module'
import { UploadFileGroupModule } from './upload-file-group/upload-file-group.module'
import { UploadFileModule } from './upload-file/upload-file.module'
import { ArticleCategoryModule } from './article-category/article-category.module'
import { RouterModule } from '@nestjs/core'
import { FileStorageModule } from './file-storage/file-storage.module'
import { S3Module } from './s3/s3.module'

const adminModules = [
  AuthApiModule,
  ArticleModule,
  LanguageModule,
  AdminUserModule,
  AdminAuthModule,
  AdminRoleModule,
  AdminRouteModule,
  SystemSettingModule,
  UploadFileModule,
  UploadFileGroupModule,
  ArticleCategoryModule,
  FileStorageModule,
  S3Module,
]

@Module({
  imports: [
    ...adminModules,
    RouterModule.register([
      {
        path: 'admin',
        children: adminModules,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminModule {}
