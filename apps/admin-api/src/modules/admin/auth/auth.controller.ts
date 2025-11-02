import { Body, Controller, Get, Patch, Post, Req } from "@nestjs/common"
import { AuthService } from "./auth.service"
import {
  Public,
  AppApiCreatedResponse,
  AppApiInternalServerErrorResponse,
  AppApiOkResponse,
  AppApiUnauthorizedResponse,
  SuccessMsg,
  Authenticated,
  PermissionGroup,
  Permission,
} from "@aiknew/shared-api-decorators"
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { SuccessResponse, t } from "@aiknew/shared-api-utils"
import { type AuthAdminRequest } from "@aiknew/shared-api-types"
import { type Request } from "express"
import { Throttle } from "@nestjs/throttler"
import {
  AltchaChallengeDto,
  LoginBodyDto,
  CaptchaDto,
  LoginSuccessDto,
  UpdateUserInfoDto,
  UserInfoDto,
} from "./dto"

@PermissionGroup({ name: "admin-auth.adminAuthManagement" })
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @SuccessMsg(t("admin-auth.loginSuccess"))
  @AppApiUnauthorizedResponse()
  @AppApiCreatedResponse(LoginSuccessDto)
  @ApiOperation({
    security: [],
  })
  @Post("login")
  login(
    @Body() loginBodyDto: LoginBodyDto,
    @Req() req: Request,
  ): Promise<LoginSuccessDto> {
    return this.service.userLogin(loginBodyDto, req)
  }

  @Public()
  @Get("captcha")
  @ApiOperation({ security: [] })
  @AppApiOkResponse(CaptchaDto)
  @AppApiInternalServerErrorResponse()
  captcha(): Promise<CaptchaDto> {
    return this.service.generateCaptcha()
  }

  @Public()
  @Get("altcha")
  @ApiOkResponse({ type: AltchaChallengeDto })
  @ApiOperation({ security: [] })
  async altcha() {
    const data = await this.service.createAltchaChallenge()
    return new SuccessResponse(data, true)
  }

  @Authenticated()
  @SuccessMsg(t("admin-auth.infoUpdated"))
  @AppApiOkResponse(UserInfoDto)
  @Get("info")
  async info(@Req() req: AuthAdminRequest): Promise<UserInfoDto> {
    return this.service.getUserInfo(req.adminUser)
  }

  @Permission({ key: "auth:update", name: "admin-auth.updateInfo" })
  @Patch("update")
  async updateUserInfo(
    @Req() req: AuthAdminRequest,
    @Body() data: UpdateUserInfoDto,
  ) {
    return this.service.updateUserInfo(req.adminUser, data)
  }
}
