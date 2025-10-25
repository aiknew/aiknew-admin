import { Controller, Get, Query } from "@nestjs/common"
import {
  AppApiPaginationResponse,
  Permission,
  PermissionGroup,
} from "@aiknew/shared-api-decorators"
import { LoginLogDto } from "./dto/login-log.dto"
import { PaginationResponseDto } from "@aiknew/shared-api-dtos"
import { LoginLogService } from "./login-log.service"
import { QueryLoginLogDto } from "./dto/query-login-log.dto"

@PermissionGroup({ name: "login-log.loginLogManagement" })
@Controller("login-log")
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @Permission({
    key: "login-log:pagination",
    name: "login-log.loginLogPagination",
  })
  @Get()
  @AppApiPaginationResponse(LoginLogDto)
  async pagination(
    @Query() query: QueryLoginLogDto,
  ): Promise<PaginationResponseDto<LoginLogDto[]>> {
    return this.loginLogService.pagination(query)
  }
}
