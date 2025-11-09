import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from "@nestjs/common"
import { createClient, type RedisClientType } from "redis"
import { REDIS_MODULE_OPTIONS } from "./redis.constants"
import type { RedisModuleOptions } from "./redis.module"

@Injectable()
export class RedisProvider implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisProvider.name)
  redisClient: RedisClientType

  constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    private readonly options: RedisModuleOptions,
  ) {
    this.validateOptions()
  }

  private validateOptions() {
    if (!this.options.host) {
      throw new Error("Redis host is required")
    }
    if (!this.options.port || this.options.port <= 0) {
      throw new Error("Redis port must be a positive number")
    }
  }

  getOptions(): RedisModuleOptions {
    return this.options
  }

  async onModuleInit() {
    try {
      this.redisClient = createClient({
        socket: {
          host: this.options.host,
          port: this.options.port,
        },
      })

      this.redisClient.on("error", (err) => {
        this.logger.error("Redis Client Error:", err)
      })

      this.redisClient.on("connect", () => {
        this.logger.log("Redis client connected")
      })

      this.redisClient.on("ready", () => {
        this.logger.log("Redis client ready")
      })

      this.redisClient.on("end", () => {
        this.logger.warn("Redis client connection ended")
      })

      await this.redisClient.connect()
    } catch (error) {
      this.logger.error("Failed to connect to Redis:", error)
      throw error
    }
  }

  async onModuleDestroy() {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        await this.redisClient.quit()
        this.logger.log("Redis connection closed successfully")
      }
    } catch (error) {
      this.logger.error("Error closing Redis connection:", error)
    }
  }
}
