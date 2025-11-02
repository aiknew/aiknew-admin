import { Module } from "@nestjs/common"
import { SystemConfigController } from "./system-config.controller"
import { SystemConfigService } from "./system-config.service"

@Module({
  controllers: [SystemConfigController],
  providers: [SystemConfigService],
})
export class SystemConfigModule {}
