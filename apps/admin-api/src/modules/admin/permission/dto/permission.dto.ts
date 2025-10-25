import { ApiProperty } from "@nestjs/swagger"
import { RequestMethod, AdminPermissionSource } from "@aiknew/shared-admin-db"
import { PermissionTranslationDto } from "./permission-translation.dto"

export class PermissionDto {
  id: string

  path: string

  @ApiProperty({ enumName: "RequestMethod", enum: RequestMethod })
  method: RequestMethod

  key: string

  @ApiProperty({
    enumName: "AdminPermissionSource",
    enum: AdminPermissionSource,
  })
  source: AdminPermissionSource

  groupId: string | null

  order: number

  createdAt: Date

  updatedAt: Date

  translations: PermissionTranslationDto[]
}
