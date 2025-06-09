import { Module } from '@nestjs/common'
import { AdminUserController } from './admin-user.controller'
import { AdminUserService } from './admin-user.service'

@Module({
  imports: [],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
