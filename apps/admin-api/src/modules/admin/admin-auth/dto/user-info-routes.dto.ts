import { OmitType } from '@nestjs/swagger'
import { AdminRouteDto } from '../../admin-route/dto/admin-route.dto'

export class UserInfoRoutesDto extends OmitType(AdminRouteDto, ['apis']) {}
