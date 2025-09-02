import { PermissionGroupDto } from "../../permission-group/dto/permission-group.dto"
import { PermissionDto } from "./permission.dto"

export class PermissionsAndGroupsDto {
  total: number

  current: number

  pageSize: number

  groupList: PermissionGroupDto[]

  permissionList: PermissionDto[]
}
