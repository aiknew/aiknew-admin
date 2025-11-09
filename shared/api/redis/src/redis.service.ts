import { Injectable } from "@nestjs/common"
import { RedisClientType, SetOptions } from "redis"
import { type ScanCommandOptions } from "@redis/client/dist/lib/commands/SCAN.js"
import { RedisProvider } from "./redis.provider"

@Injectable()
export class RedisService {
  constructor(private readonly redisProvider: RedisProvider) {}

  get client(): RedisClientType {
    if (!this.redisProvider.redisClient?.isOpen) {
      throw new Error("Redis client is not connected")
    }
    return this.redisProvider.redisClient
  }

  protected setPrefix(key: string): string {
    const options = this.redisProvider.getOptions()
    return options.keyPrefix ? options.keyPrefix + key : key
  }

  async deleteKeysByPattern(
    pattern: string,
    options: Omit<ScanCommandOptions, "MATCH"> = { COUNT: 1000 },
  ) {
    let cursor = 0
    const allKeys: string[] = []

    do {
      const res = await this.client.scan(cursor, {
        ...options,
        MATCH: this.setPrefix(pattern),
      })

      allKeys.push(...res.keys)
      cursor = res.cursor
    } while (cursor !== 0)

    if (allKeys.length > 0) {
      await this.client.del(allKeys)
    }

    return allKeys.length
  }

  delete(keyOrKeyArr: string | string[]): Promise<number> {
    const keyArr = Array.isArray(keyOrKeyArr)
      ? keyOrKeyArr.map((item) => this.setPrefix(item))
      : this.setPrefix(keyOrKeyArr)

    return this.client.del(keyArr)
  }

  get(key: string) {
    return this.client.get(this.setPrefix(key))
  }

  set(key: string, value: number | string, options?: SetOptions) {
    return this.client.set(this.setPrefix(key), value, options)
  }

  exists(key: string) {
    return this.client.exists(this.setPrefix(key))
  }

  async ping(): Promise<string> {
    return this.client.ping()
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.ping()
      return true
    } catch {
      return false
    }
  }
}
