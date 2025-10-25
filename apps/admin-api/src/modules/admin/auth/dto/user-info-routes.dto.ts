import { OmitType } from "@nestjs/swagger"
import { AuthRouteDto } from "../../auth-route/dto/auth-route.dto"

export class UserInfoRoutesDto extends OmitType(AuthRouteDto, [
  "permissions",
]) {}
