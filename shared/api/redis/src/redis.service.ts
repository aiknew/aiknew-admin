import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { RedisClientType, SetOptions } from "redis"
import { REDIS_CLIENT } from "@aiknew/shared-api-utils"
import { type ScanCommandOptions } from "@redis/client/dist/lib/commands/SCAN.js"

@Injectable()
export class RedisService {
  @Inject(REDIS_CLIENT)
  redisClient: RedisClientType

  constructor(private configService: ConfigService) {}

  protected setPrefix(key: string): string {
    return this.configService.get<string>("REDIS_PREFIX", "") + key
  }

  async deleteKeysByPattern(
    pattern: string,
    options: Omit<ScanCommandOptions, "MATCH"> = { COUNT: 1000 },
  ) {
    let cursor = 0
    const keys: string[] = []

    do {
      const res = await this.redisClient.scan(cursor, {
        ...options,
        MATCH: this.setPrefix(pattern),
      })

      keys.push(...res.keys)
      cursor = res.cursor
      if (keys.length > 0) {
        await this.redisClient.del(keys)
      }
      keys.length = 0
    } while (cursor !== 0)
  }

  delete(keyOrKeyArr: string | string[]) {
    const keyArr = Array.isArray(keyOrKeyArr)
      ? keyOrKeyArr.map((item) => this.setPrefix(item))
      : this.setPrefix(keyOrKeyArr)

    return this.redisClient.del(keyArr)
  }

  get(key: string) {
    return this.redisClient.get(this.setPrefix(key))
  }

  set(key: string, value: number | string, options?: SetOptions) {
    return this.redisClient.set(this.setPrefix(key), value, options)
  }
}
