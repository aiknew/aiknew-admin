import { Module } from '@nestjs/common'
import { AdminRouteController } from './admin-route.controller'
import { AdminRouteService } from './admin-route.service'
import { AdminUserModule } from '../admin-user/admin-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AdminRouteController],
  providers: [AdminRouteService],
  exports: [],
})
export class AdminRouteModule {}
