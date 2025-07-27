import { Module } from '@nestjs/common'
import { AuthUserController } from './auth-user.controller'
import { AuthUserService } from './auth-user.service'

@Module({
  imports: [],
  controllers: [AuthUserController],
  providers: [AuthUserService],
  exports: [AuthUserService],
})
export class AdminUserModule {}
