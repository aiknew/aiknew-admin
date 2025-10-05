import { Injectable } from '@nestjs/common'
import { AdminUserService } from '../admin-user/admin-user.service'
import { JwtService } from '@nestjs/jwt'
import * as svgCaptcha from 'svg-captcha'
import { randomUUID } from 'crypto'
import { RedisService } from '@aiknew/shared-api-redis'
import {
  AppBadRequestException,
  AppUnauthorizedException,
} from '@aiknew/shared-api-exceptions'
import { LoginBodyDto } from './dto/login-body.dto'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AdminJWTPayload, AuthAdminUser } from '@aiknew/shared-api-types'
import { Prisma, PrismaService } from '@aiknew/shared-admin-db'
import { UpdateUserInfoDto } from './dto/update-user-info.dto'
import { createHMAC } from '@aiknew/shared-api-utils'
import { LoginLogService } from '../login-log/login-log.service'
import { Request } from 'express'
import { storeIP } from 'range_check'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private authUserService: AdminUserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private i18n: I18nService,
    private loginLogService: LoginLogService,
    private configService: ConfigService
  ) { }

  get userModel(): PrismaService['adminUser'] {
    return this.prisma.adminUser
  }

  async validateUser(userName: string, password: string) {
    try {
      const { super: _, ...user } = await this.authUserService.findUser(
        userName,
        password,
      )
      return user
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppBadRequestException(
              this.i18n.t('admin-user.userNotExists', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }

      throw err
    }
  }

  async getUserInfo(user: AuthAdminUser) {
    return this.authUserService.getUserInfo(user.userId)
  }

  async updateUserInfo(requestUser: AuthAdminUser, data: UpdateUserInfoDto) {
    const user = await this.userModel.findUnique({
      where: {
        id: requestUser.userId,
        password: createHMAC(data.password, this.configService.get<string>('ADMIN_USER_PASSWORD_SECRET')),
      },
    })

    if (!user) {
      throw new AppBadRequestException(this.i18n.t('admin-auth.wrongPassword'))
    }

    await this.userModel.update({
      where: { id: requestUser.userId },
      data: {
        password: createHMAC(data.newPassword, this.configService.get<string>('ADMIN_USER_PASSWORD_SECRET')),
      },
    })
  }

  private async recordLoginLog(data: { userName: string, userId: string, success: boolean }, req: Request) {
    try {
      const { success, userId, userName } = data

      const ip = req.ip ||
        req.socket?.remoteAddress ||
        'unknown'

      const userAgent = req.get('User-Agent') || req.headers['user-agent'] || 'unknown'

      await this.loginLogService.record({
        userName,
        userId,
        isSuccess: success,
        ip: storeIP(ip),
        userAgent,
      })
    } catch (error) {
      console.error('record login log error: ', error)
    }
  }

  async userLogin(loginBodyDto: LoginBodyDto, req: Request) {
    const { captchaCode, captchaKey, password, userName } = loginBodyDto

    try {
      await this.verifyCaptcha(captchaKey, captchaCode)
      const user = await this.validateUser(userName, password)
      if (user) {
        if (!user.routes.length) {
          throw new AppUnauthorizedException(
            this.i18n.t('admin-auth.noPermissions'),
          )
        }

        const tokenPayload: AdminJWTPayload = {
          sub: user.id,
          userName: user.userName,
        }

        this.recordLoginLog({ userName, userId: user.id, success: true }, req)

        return {
          userInfo: user,
          access_token: this.jwtService.sign(tokenPayload),
        }
      } else {
        this.recordLoginLog({ userId: "", userName: loginBodyDto.userName, success: false }, req)
        throw new AppUnauthorizedException()
      }
    } catch (err) {
      this.recordLoginLog({ userId: "", userName: loginBodyDto.userName, success: false }, req)
      throw err
    } finally {
      await this.removeCaptchaCache(captchaKey)
    }
  }

  async generateCaptcha() {
    const captcha = svgCaptcha.create()
    const captchaKey = `captcha:${randomUUID()}`

    await this.redisService.set(captchaKey, captcha.text, {
      EX: 5 * 60,
    })
    return {
      key: captchaKey,
      captcha: captcha.data,
    }
  }

  async verifyCaptcha(captchaKey: string, captchaCode: string) {
    const captcha = await this.redisService.get(captchaKey)
    if (captcha !== captchaCode) {
      throw new AppBadRequestException(
        this.i18n.t('admin-auth.wrongCaptcha', {
          lang: I18nContext.current()?.lang,
        }),
      )
    }

    return true
  }

  removeCaptchaCache(captchaKey: string) {
    return this.redisService.delete(captchaKey)
  }
}
