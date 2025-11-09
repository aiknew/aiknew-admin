import {
  Global,
  Module,
  OnModuleDestroy,
  Injectable,
  Inject,
} from "@nestjs/common"
import { RedisService } from "@aiknew/shared-api-redis"
import { REDIS_CLIENT } from "@aiknew/shared-api-utils"
import { createClient, type RedisClientType } from "redis"
import { ConfigService } from "@nestjs/config"
import { PrismaModule } from "@aiknew/shared-admin-db"

@Injectable()
export class RedisConnectionService implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private redisClient: RedisClientType) {}

  async onModuleDestroy() {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        await this.redisClient.quit()
      }
    } catch (error) {
      console.error("Error closing Redis connection:", error)
    }
  }
}

@Global()
@Module({
  imports: [PrismaModule.forRoot({ global: true })],
  providers: [
    RedisService,
    RedisConnectionService,
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const redisClient = createClient({
          socket: {
            host: configService.get("REDIS_HOST"),
            port: configService.get("REDIS_PORT"),
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
