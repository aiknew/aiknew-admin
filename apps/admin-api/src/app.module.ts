import { Module } from '@nestjs/common'
import { AdminModule } from './modules/admin/admin.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseJsonInterceptor } from '@aiknew/shared-api-interceptors'
import { AllExceptionsFilter } from '@aiknew/shared-api-filters'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GlobalModule } from './modules/global/global.module'
import { AuthGuard } from './common/guards'
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n'
import { TranslationsConstraint } from './common/validators'
import commonConfig from './common/config/common.config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { JwtService } from '@nestjs/jwt'
import { AuthUserService } from './modules/admin/auth-user/auth-user.service'

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      ignoreEnvFile: true,
      load: [commonConfig({ mainFolder: __dirname })],
    }),
    GlobalModule,

    I18nModule.forRootAsync({
      inject: [ConfigService],
      resolvers: [
        new HeaderResolver(['x-lang']),
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      useFactory(configService: ConfigService) {
        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: configService.get('common.localesFolder'),
            watch: true,
            includeSubfolders: true,
          },
        }
      },
    }),

    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return [
          {
            rootPath: configService.get('common.publicFolder'),
            serveStaticOptions: {
              // Whether to forward all 404 errors to the default index.html
              fallthrough: false,
            },
          },
        ]
      },
    }),
  ],
  controllers: [],
  providers: [
    AuthUserService,
    ConfigService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseJsonInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TranslationsConstraint,
  ],
})
export class AppModule {}
