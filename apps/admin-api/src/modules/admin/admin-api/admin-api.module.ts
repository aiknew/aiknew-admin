import { Module } from '@nestjs/common'
import { AdminApiController } from './admin-api.controller'
import { AdminApiService } from './admin-api.service'
import { AdminUserModule } from '../admin-user/admin-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
  exports: [],
})
export class AdminApiModule {}
