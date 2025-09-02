import { Module } from '@nestjs/common'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'
import { AdminUserModule } from '../admin-user/admin-user.module'
import { DiscoveryModule } from '@nestjs/core'
import { PermissionSyncService } from './permission-sync.service'

@Module({
  imports: [AdminUserModule, DiscoveryModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionSyncService],
  exports: [
    PermissionSyncService
  ],
})
export class PermissionModule { }
