import { Injectable, Type } from '@nestjs/common'
import { PrismaProvider } from './prisma.provider'

export type ExtendedPrismaClient = ReturnType<PrismaProvider['withExtensions']>

export type ExtendedPrismaTransactionClient = Omit<
  ExtendedPrismaClient,
  '$extends' | '$transaction' | '$disconnect' | '$connect' | '$on' | '$use'
>

const ExtendedClient = class {
  constructor(provider: PrismaProvider) {
    return provider.withExtensions()
  }
} as Type<ExtendedPrismaClient>

@Injectable()
export class PrismaService extends ExtendedClient {
  constructor(provider: PrismaProvider) {
    super(provider)
  }
}
