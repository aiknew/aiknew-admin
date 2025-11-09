import {
  type DynamicModule,
  type ForwardReference,
  type InjectionToken,
  Module,
  OptionalFactoryDependency,
  type Type,
} from "@nestjs/common"
import { RedisService } from "./redis.service"
import { RedisProvider } from "./redis.provider"
import { REDIS_MODULE_OPTIONS } from "./redis.constants"

type PromiseAble<T> = Promise<T> | T

export interface RedisModuleOptions {
  global: boolean
  host: string | undefined
  port: number | undefined
  keyPrefix: string
}

export interface RedisModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => PromiseAble<Omit<RedisModuleOptions, "global">>
  inject: (InjectionToken | OptionalFactoryDependency)[]
  imports: (
    | Type<any>
    | DynamicModule
    | ForwardReference<any>
    | Promise<DynamicModule>
  )[]
  global: boolean
}

@Module({})
export class RedisModule {
  static forRoot({
    global,
    ...configurations
  }: RedisModuleOptions): DynamicModule {
    return {
      global,
      module: RedisModule,
      providers: [
        RedisService,
        RedisProvider,
        {
          provide: REDIS_MODULE_OPTIONS,
          useValue: configurations,
        },
      ],
      exports: [RedisService, RedisProvider],
    }
  }

  static forRootAsync({
    imports,
    inject,
    useFactory,
    global,
  }: RedisModuleAsyncOptions): DynamicModule {
    return {
      global,
      module: RedisModule,
      imports,
      providers: [
        RedisService,
        RedisProvider,
        {
          provide: REDIS_MODULE_OPTIONS,
          useFactory,
          inject,
        },
      ],
      exports: [RedisService, RedisProvider],
    }
  }
}
