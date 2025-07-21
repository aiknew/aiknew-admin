import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'
import { PrismaProvider } from './prisma.provider.js'

@Global()
@Module({
  providers: [PrismaProvider, PrismaService],
  exports: [PrismaProvider, PrismaService],
})
export class PrismaModule {}
