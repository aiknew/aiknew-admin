import { Module } from '@nestjs/common'
import { AuthApiController } from './auth-api.controller'
import { AuthApiService } from './auth-api.service'
import { AdminUserModule } from '../auth-user/auth-user.module'

@Module({
  imports: [AdminUserModule],
  controllers: [AuthApiController],
  providers: [AuthApiService],
  exports: [],
})
export class AuthApiModule {}
