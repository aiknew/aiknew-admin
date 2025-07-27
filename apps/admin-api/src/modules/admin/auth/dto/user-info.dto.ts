import { ApiExtraModels, OmitType } from '@nestjs/swagger'
import { AuthUserDto } from '../../auth-user/dto/auth-user.dto'
import { UserInfoRoutesDto } from './user-info-routes.dto'

@ApiExtraModels(UserInfoRoutesDto)
export class UserInfoDto extends OmitType(AuthUserDto, ['roles']) {
  routes: UserInfoRoutesDto[]
}
