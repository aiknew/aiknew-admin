import { Module } from '@nestjs/common'
import { AuthRoleController } from './auth-role.controller'
import { AuthRoleService } from './auth-role.service'
import { AdminUserModule } from '../auth-user/auth-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AuthRoleController],
  providers: [AuthRoleService],
  exports: [],
})
export class AuthRoleModule {}
