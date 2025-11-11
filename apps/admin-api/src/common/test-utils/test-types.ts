import { type PrismaService } from "@aiknew/shared-admin-db"
import { type ResponseJson } from "@aiknew/shared-api-dtos"
import { type Prettify } from "@aiknew/shared-utils"
import { type Type } from "@nestjs/common"
import { type NestExpressApplication } from "@nestjs/platform-express"
import { type I18nService } from "nestjs-i18n"

declare global {
  var app: NestExpressApplication
  var i18nService: I18nService
  var prismaService: PrismaService
}

type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : K
}[keyof T]
type DataProperties<T> = Pick<T, NonFunctionKeys<T>>
export type ResponseJsonType<T extends Type<any>> = Prettify<
  ResponseJson<Prettify<DataProperties<InstanceType<T>>>>
>
