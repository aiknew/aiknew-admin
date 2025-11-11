import { Injectable } from "@nestjs/common"
import { AdminUserService } from "../admin-user/admin-user.service"
import { JwtService } from "@nestjs/jwt"
import * as svgCaptcha from "svg-captcha"
import { randomUUID } from "crypto"
import { RedisService } from "@aiknew/shared-api-redis"
import {
  AppBadRequestException,
  AppHttpException,
  AppUnauthorizedException,
} from "@aiknew/shared-api-exceptions"
import { LoginBodyDto } from "./dto/login-body.dto"
import { I18nContext, I18nService } from "nestjs-i18n"
import type { AdminJWTPayload, AuthAdminUser } from "@aiknew/shared-api-types"
import { Prisma, PrismaService } from "@aiknew/shared-admin-db"
import { UpdateUserInfoDto } from "./dto/update-user-info.dto"
import { createHMAC } from "@aiknew/shared-api-utils"
import { LoginLogService } from "../login-log/login-log.service"
import { Request } from "express"
import { storeIP } from "range_check"
import { ConfigService } from "@nestjs/config"
import { createChallenge, verifySolution, extractParams } from "altcha-lib"
import type { DeepPartial } from "@aiknew/shared-utils"
import dayjs from "dayjs"
import { SystemConfigService } from "../system-config/system-config.service"
import { VerificationTypeEnum } from "@aiknew/shared-enums"
import {
  DefaultVerificationType,
  LoginVerificationTypeKey,
} from "@aiknew/shared-constants"

type VerificationData = {
  captcha: {
    key: string
    code: string
  }

  altcha: {
    payload: string
  }
}

@Injectable()
export class AuthService {
  // altcha verification expiration time in seconds
  private altchaExpires = 1200

  constructor(
    private prisma: PrismaService,
    private authUserService: AdminUserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private i18n: I18nService,
    private loginLogService: LoginLogService,
    private configService: ConfigService,
    private systemConfigService: SystemConfigService,
  ) {}

  get userModel(): PrismaService["adminUser"] {
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
          case "P2025":
            throw new AppBadRequestException(
              this.i18n.t("admin-user.userNotExists", {
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
        password: createHMAC(
          data.password,
          this.configService.get<string>("ADMIN_USER_PASSWORD_SECRET"),
        ),
      },
    })

    if (!user) {
      throw new AppBadRequestException(this.i18n.t("admin-auth.wrongPassword"))
    }

    await this.userModel.update({
      where: { id: requestUser.userId },
      data: {
        password: createHMAC(
          data.newPassword,
          this.configService.get<string>("ADMIN_USER_PASSWORD_SECRET"),
        ),
      },
    })
  }

  private async recordLoginLog(
    data: { userName: string; userId: string; success: boolean },
    req: Request,
  ) {
    try {
      const { success, userId, userName } = data

      const ip = req.ip || req.socket?.remoteAddress || "unknown"

      const userAgent =
        req.get("User-Agent") || req.headers["user-agent"] || "unknown"

      await this.loginLogService.record({
        userName,
        userId,
        isSuccess: success,
        ip: storeIP(ip) as string,
        userAgent,
      })
    } catch (error) {
      console.error("record login log error: ", error)
    }
  }

  async processVerification(verificationData: DeepPartial<VerificationData>) {
    if (process.env.NODE_ENV === "test") {
      return
    }

    const { altcha, captcha } = verificationData
    let verificationTypeConfig = await this.systemConfigService.getConfigByKey(
      LoginVerificationTypeKey,
    )

    if (
      !verificationTypeConfig ||
      !Object.keys(VerificationTypeEnum).includes(verificationTypeConfig.value)
    ) {
      verificationTypeConfig = {
        value: DefaultVerificationType,
      }
    }

    const verificationType = verificationTypeConfig.value

    if (verificationType === VerificationTypeEnum.CAPTCHA) {
      if (!captcha?.key || !captcha?.code) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.invalidCaptcha", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      await this.verifyCaptcha(captcha.key, captcha.code)
    } else if (verificationType === VerificationTypeEnum.ALTCHA) {
      if (!altcha?.payload) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.altchaVerificationInvalid", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      await this.verifyAltchaChallenge(altcha.payload)
    }
  }

  async userLogin(loginBodyDto: LoginBodyDto, req: Request) {
    const { captchaCode, captchaKey, altchaPayload, password, userName } =
      loginBodyDto

    try {
      await this.processVerification({
        captcha: {
          code: captchaCode,
          key: captchaKey,
        },

        altcha: {
          payload: altchaPayload,
        },
      })

      const user = await this.validateUser(userName, password)

      if (user) {
        if (!user.routes.length) {
          throw new AppUnauthorizedException(
            this.i18n.t("admin-auth.noPermissions"),
          )
        }

        const tokenPayload: AdminJWTPayload = {
          sub: user.id,
          userName: user.userName,
        }

        await this.recordLoginLog(
          { userName, userId: user.id, success: true },
          req,
        )

        return {
          userInfo: user,
          access_token: this.jwtService.sign(tokenPayload),
        }
      } else {
        await this.recordLoginLog(
          { userId: "", userName: loginBodyDto.userName, success: false },
          req,
        )
        throw new AppUnauthorizedException()
      }
    } catch (err) {
      await this.recordLoginLog(
        { userId: "", userName: loginBodyDto.userName, success: false },
        req,
      )
      throw err
    } finally {
      if (captchaKey) {
        await this.removeCaptchaCache(captchaKey)
      }
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
        this.i18n.t("admin-auth.wrongCaptcha", {
          lang: I18nContext.current()?.lang,
        }),
      )
    }

    return true
  }

  removeCaptchaCache(captchaKey: string) {
    return this.redisService.delete(captchaKey)
  }

  genAltchaCacheKey(id: string) {
    return `altcha-${id}`
  }

  async createAltchaChallenge() {
    const hmacKey = this.configService.get<string>("ALTCHA_SECRET_KEY")

    if (!hmacKey) {
      throw new Error("empty altcha secret key")
    }

    const id = randomUUID()
    const expiresUTC = dayjs().add(this.altchaExpires, "second").utc().format()
    const challenge = await createChallenge({
      hmacKey,
      number: 10000,
      params: {
        expiresUTC,
        id,
      },
    })

    return challenge
  }

  async verifyAltchaChallenge(payload: string) {
    const hmacKey = this.configService.get<string>("ALTCHA_SECRET_KEY")

    if (!hmacKey) {
      throw new Error("empty altcha secret key")
    }

    try {
      const { id, expiresUTC } = extractParams(payload)

      if (!id || !expiresUTC) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.altchaVerificationFailed", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const exists = await this.redisService.exists(this.genAltchaCacheKey(id))
      if (exists) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.altchaVerificationInvalid", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const isAfter = dayjs.utc().isAfter(expiresUTC)
      if (isAfter) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.altchaVerificationExpired", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      const verified = await verifySolution(payload, hmacKey)
      if (!verified) {
        throw new AppBadRequestException(
          this.i18n.t("admin-auth.altchaVerificationFailed", {
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      // Record successfully verified challenge in redis to prevent replay attacks
      await this.redisService.set(this.genAltchaCacheKey(id), "true", {
        EX: this.altchaExpires,
        NX: true,
      })
    } catch (err) {
      if (err instanceof AppHttpException) {
        throw err
      }
      throw new AppBadRequestException(
        this.i18n.t("admin-auth.altchaVerificationFailed", {
          lang: I18nContext.current()?.lang,
        }),
      )
    }
  }
}
