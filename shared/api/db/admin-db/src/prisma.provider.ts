import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "./prisma-client"
import {
  existsExtension,
  formatDateExtension,
  paginateExtension,
  softDeleteExtension,
} from "./prisma.extensions.js"

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static initialized = false

  constructor() {
    super({
      log: [
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    })
  }

  async onModuleInit() {
    if (!PrismaProvider.initialized) {
      PrismaProvider.initialized = true
      await this.$connect()
    }
  }

  async onModuleDestroy() {
    if (PrismaProvider.initialized) {
      PrismaProvider.initialized = false
      await this.$disconnect()
    }
  }

  withExtensions() {
    return this.$extends(existsExtension)
      .$extends(softDeleteExtension)
      .$extends(paginateExtension)
      .$extends(formatDateExtension)
  }
}
