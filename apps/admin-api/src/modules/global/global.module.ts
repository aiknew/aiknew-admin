import { Global, Module } from "@nestjs/common"
import { RedisService, RedisModule } from "@aiknew/shared-api-redis"
import { ConfigService } from "@nestjs/config"
import { PrismaModule } from "@aiknew/shared-admin-db"

@Global()
@Module({
  imports: [
    PrismaModule.forRoot({ global: true }),
    RedisModule.forRootAsync({
      global: true,
      imports: [],
      useFactory(configService: ConfigService) {
        return {
          host: configService.get<string>("REDIS_HOST"),
          port: configService.get<number>("REDIS_PORT"),
          keyPrefix: configService.get<string>("REDIS_PREFIX", ""),
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class GlobalModule {}
