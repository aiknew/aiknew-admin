import { ApiExtraModels, OmitType } from '@nestjs/swagger'
import { AdminUserDto } from '../../admin-user/dto/admin-user.dto'
import { UserInfoRoutesDto } from './user-info-routes.dto'

@ApiExtraModels(UserInfoRoutesDto)
export class UserInfoDto extends OmitType(AdminUserDto, ['roles']) {
  routes: UserInfoRoutesDto[]
}
