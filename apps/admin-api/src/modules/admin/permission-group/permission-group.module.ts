import { Module } from "@nestjs/common"
import { PermissionGroupController } from "./permission-group.controller"
import { PermissionGroupService } from "./permission-group.service"
import { AdminUserModule } from "../admin-user/admin-user.module"

@Module({
  imports: [AdminUserModule],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
  exports: [],
})
export class PermissionGroupModule {}
