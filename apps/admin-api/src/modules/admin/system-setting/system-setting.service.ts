import { Injectable } from '@nestjs/common'
import { SystemSettingKey } from '@aiknew/shared-api-enums'
import { instanceToPlain } from 'class-transformer'
import { RedisService } from '@aiknew/shared-api-redis'
import { isObject } from '@aiknew/shared-api-utils'
import { SystemSettingDto } from './dto/system-setting.dto'
import { PrismaService } from '@aiknew/shared-admin-db'

@Injectable()
export class SystemSettingService {
  private cacheKeyPrefix = 'system-setting:'

  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  get model() {
    return this.prisma.systemSetting
  }

  protected setCacheKeyPrefix(key: string) {
    return this.cacheKeyPrefix + key
  }

  protected async setSettingCache<T extends keyof typeof SystemSettingKey>(
    key: T,
    value: SystemSettingDto[T],
  ) {
    await this.redisService.set(
      this.setCacheKeyPrefix(key),
      JSON.stringify(value),
    )
  }

  protected async getSettingCache<T extends keyof typeof SystemSettingKey>(
    key: T,
  ) {
    const cache =
      (await this.redisService.get(this.setCacheKeyPrefix(key))) ?? '{}'

    return JSON.parse(cache) as SystemSettingDto[T]
  }

  async getSystemSetting<T extends keyof typeof SystemSettingKey>(key: T) {
    const setting = await this.model.findUnique({
      where: { key },
    })

    if (isObject(setting) && isObject(setting.value)) {
      return setting.value as unknown as SystemSettingDto[T]
    }

    // if the specific setting data is null, return the default setting data
    const cls: new () => SystemSettingDto[T] = Reflect.getMetadata(
      'design:type',
      SystemSettingDto.prototype,
      key,
    ) as new () => SystemSettingDto[T]

    return instanceToPlain(new cls()) as SystemSettingDto[T]
  }

  async setSystemSetting(systemSettingDto: SystemSettingDto) {
    const keys = Object.entries(systemSettingDto)
      .filter(([_, val]) => {
        return Boolean(val)
      })
      .map((item) => item[0])

    await this.prisma.$transaction(
      keys.map((key) => {
        const value = instanceToPlain(systemSettingDto[key])
        return this.model.upsert({
          where: { key },

          update: {
            value,
          },

          create: {
            key,
            value,
          },
        })
      }),
    )
  }
}
