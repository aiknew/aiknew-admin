import { OmitType } from '@nestjs/swagger'
import { AdminApiDto } from './admin-api.dto'

export class AdminApiTreeListDto extends OmitType(AdminApiDto, [
  'order',
  'createdAt',
  'updatedAt',
]) {
  // FIXME: Swagger UI displays the wrong type, but the generated JSON file is correct
  children: AdminApiTreeListDto[]
}
