import { Global, Module } from '@nestjs/common'
import { RedisService } from '@aiknew/shared-api-redis'
import { REDIS_CLIENT } from '@aiknew/shared-api-utils'
import { createClient } from 'redis'
import { ConfigService } from '@nestjs/config'
import { PrismaModule } from '@aiknew/shared-admin-db'

@Global()
@Module({
  imports: [PrismaModule.forRoot({ global: true })],
  providers: [
    RedisService,
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const redisClient = createClient({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        })

        await redisClient.connect()
        return redisClient
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class GlobalModule {}
