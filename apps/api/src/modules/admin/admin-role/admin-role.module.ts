import { Module } from '@nestjs/common'
import { AdminRoleController } from './admin-role.controller'
import { AdminRoleService } from './admin-role.service'
import { AdminUserModule } from '../admin-user/admin-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
  exports: [],
})
export class AdminRoleModule {}
