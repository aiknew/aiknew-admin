import { Module } from "@nestjs/common"
import { PermissionController } from "./permission.controller"
import { PermissionService } from "./permission.service"
import { AdminUserModule } from "../admin-user/admin-user.module"
import { DiscoveryModule } from "@nestjs/core"

@Module({
  imports: [AdminUserModule, DiscoveryModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [],
})
export class PermissionModule {}
