import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaProvider } from './prisma.provider'

@Global()
@Module({
  providers: [PrismaProvider, PrismaService],
  exports: [PrismaProvider, PrismaService],
})
export class PrismaModule {}
