import { DynamicModule, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'
import { PrismaProvider } from './prisma.provider.js'

interface Options {
  global: boolean
  serviceName?: string
}

@Module({
  providers: [PrismaProvider, PrismaService],
  exports: [PrismaProvider, PrismaService],
})
export class PrismaModule {
  static forRoot({ global, serviceName }: Options): DynamicModule {
    const serviceToken = serviceName ?? PrismaService

    return {
      global,
      module: PrismaModule,
      providers: [
        {
          provide: serviceToken,
          useClass: PrismaService,
        },
      ],
      exports: [serviceToken],
    }
  }
}
