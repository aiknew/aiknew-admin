import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { LanguageModule } from './language/language.module'
import { AdminUserModule } from './admin-user/admin-user.module'
import { AuthModule } from './auth/auth.module'
import { PermissionModule } from './permission/permission.module'
import { PermissionGroupModule } from './permission-group/permission-group.module'
import { AuthRoleModule } from './auth-role/auth-role.module'
import { AdminRouteModule } from './auth-route/auth-route.module'
import { SystemSettingModule } from './system-setting/system-setting.module'
import { UploadFileGroupModule } from './upload-file-group/upload-file-group.module'
import { UploadFileModule } from './upload-file/upload-file.module'
import { ArticleCategoryModule } from './article-category/article-category.module'
import { DictTypeModule } from './dict-type/dict-type.module'
import { DiscoveryService, MetadataScanner, RouterModule } from '@nestjs/core'
import { FileStorageModule } from './file-storage/file-storage.module'
import { S3Module } from './s3/s3.module'
import { DictModule } from './dict/dict.module'
import { ConfigModule } from './config/config.module'
import { adminBasePath } from '../../common/constants'

const adminModules = [
  PermissionModule,
  PermissionGroupModule,
  ArticleModule,
  LanguageModule,
  AdminUserModule,
  AuthModule,
  AuthRoleModule,
  AdminRouteModule,
  SystemSettingModule,
  UploadFileModule,
  UploadFileGroupModule,
  ArticleCategoryModule,
  DictTypeModule,
  FileStorageModule,
  S3Module,
  DictModule,
  ConfigModule
]

@Module({
  imports: [
    ...adminModules,
    RouterModule.register([
      {
        path: adminBasePath,
        children: adminModules,
      },
    ]),
  ],
  controllers: [],
  providers: [
    DiscoveryService,
    MetadataScanner,
  ],
  exports: [],
})
export class AdminModule {

}
