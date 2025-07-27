import { Module } from '@nestjs/common'
import { AuthRouteController } from './auth-route.controller'
import { AuthRouteService } from './auth-route.service'
import { AdminUserModule } from '../admin-user/admin-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AuthRouteController],
  providers: [AuthRouteService],
  exports: [],
})
export class AdminRouteModule {}
