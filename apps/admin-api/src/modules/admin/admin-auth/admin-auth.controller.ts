import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common'
import { AdminAuthService } from './admin-auth.service'
import {
  Public,
  AppApiCreatedResponse,
  AppApiInternalServerErrorResponse,
  AppApiOkResponse,
  AppApiUnauthorizedResponse,
  SuccessMsg,
  NoPermission,
} from '@aiknew/shared-api-decorators'
import { ApiOperation } from '@nestjs/swagger'
import { LoginBodyDto } from './dto/login-body.dto'
import { LoginSuccessDto } from './dto/login-success.dto'
import { CaptchaDto } from './dto/captcha.dto'
import { t } from '@aiknew/shared-api-utils'
import { UserInfoDto } from './dto/user-info.dto'
import { type AuthAdminRequest } from '@aiknew/shared-api-types'
import { UpdateUserInfoDto } from './dto/update-user-info.dto'

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @SuccessMsg(t('admin-auth.loginSuccess'))
  @Public()
  @AppApiUnauthorizedResponse()
  @AppApiCreatedResponse(LoginSuccessDto)
  @ApiOperation({
    security: [],
  })
  @Post('login')
  login(@Body() loginBodyDto: LoginBodyDto): Promise<LoginSuccessDto> {
    return this.adminAuthService.userLogin(loginBodyDto)
  }

  @Public()
  @Get('captcha')
  @ApiOperation({ security: [] })
  @AppApiOkResponse(CaptchaDto)
  @AppApiInternalServerErrorResponse()
  captcha(): Promise<CaptchaDto> {
    return this.adminAuthService.generateCaptcha()
  }

  @SuccessMsg(t('admin-auth.infoUpdated'))
  @NoPermission()
  @AppApiOkResponse(UserInfoDto)
  @Get('info')
  async info(@Req() req: AuthAdminRequest): Promise<UserInfoDto> {
    return this.adminAuthService.getUserInfo(req.adminUser)
  }

  @Patch('update')
  async updateUserInfo(
    @Req() req: AuthAdminRequest,
    @Body() data: UpdateUserInfoDto,
  ) {
    return this.adminAuthService.updateUserInfo(req.adminUser, data)
  }
}
