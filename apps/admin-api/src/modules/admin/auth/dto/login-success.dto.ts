import { ApiExtraModels } from "@nestjs/swagger"
import { UserInfoDto } from "./user-info.dto"

@ApiExtraModels(UserInfoDto)
export class LoginSuccessDto {
  userInfo: UserInfoDto

  access_token: string
}
