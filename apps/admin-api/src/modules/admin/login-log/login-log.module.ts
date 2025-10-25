import { Module } from "@nestjs/common"
import { LoginLogService } from "./login-log.service"
import { LoginLogController } from "./login-log.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [LoginLogController],
  providers: [LoginLogService],
  exports: [LoginLogService],
})
export class LoginLogModule {}
