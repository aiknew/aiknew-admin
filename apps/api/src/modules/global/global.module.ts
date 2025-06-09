import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { REDIS_CLIENT } from 'src/common/utils/constants'
import { createClient } from 'redis'
import { ConfigService } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'

@Global()
@Module({
  imports: [PrismaModule],
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
