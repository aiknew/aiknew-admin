import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { IS_PUBLIC_KEY } from '@aiknew/shared-api-decorators'
import type { Request } from 'express'
import type {
  AuthAdminRequest,
  AdminJWTPayload,
} from '@aiknew/shared-api-types'
import {
  AppForbiddenException,
  AppHttpException,
  AppUnauthorizedException,
} from '@aiknew/shared-api-exceptions'
import { t } from '@aiknew/shared-api-utils'
import { AdminUserService } from 'src/modules/admin/admin-user/admin-user.service'
import { AdminApi } from '@aiknew/shared-admin-db'
import { IS_NO_PERMISSION_KEY } from '@aiknew/shared-api-decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminUserService: AdminUserService,
  ) {}

  matchApiPermission(authApis: AdminApi[], request: Request) {
    return authApis.some((item) => {
      return (
        item.url === (request.route as Record<string, unknown>).path &&
        item.method.toLowerCase() === request.method.toLowerCase()
      )
    })
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    try {
      const request = context.switchToHttp().getRequest<AuthAdminRequest>()
      const authorization = request.get('Authorization')
      const token = authorization?.match(/Bearer\s+(\S+)/)?.[1]
      const decodedToken = this.jwtService.verify<AdminJWTPayload>(
        token ?? '',
        {
          secret: this.configService.get<string>('ADMIN_USER_JWT_SECRET') ?? '',
        },
      )

      request.adminUser = {
        userName: decodedToken.userName,
        userId: decodedToken.sub,
      }

      // request from admin
      if (/^\/admin(\/.*)?$/.test(request.path)) {
        // check if it's no permissions required
        const isNoPermission = this.reflector.getAllAndOverride<boolean>(
          IS_NO_PERMISSION_KEY,
          [context.getHandler(), context.getClass()],
        )
        if (isNoPermission) {
          return true
        }

        // check if it's super admin user
        if (await this.adminUserService.isSuperAdminUser(decodedToken.sub)) {
          return true
        }

        // validate role permissions
        const apis = await this.adminUserService.getUserApis(decodedToken.sub)
        if (this.matchApiPermission(apis, request)) {
          return true
        }

        throw new AppForbiddenException(t('common.invalidAuth'))
      }

      return true
    } catch (err) {
      if (err instanceof AppHttpException) {
        throw err
      }

      throw new AppUnauthorizedException(t('common.authExpired'))
    }
  }
}
