import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { IS_PUBLIC_KEY, PERMISSION_KEY, PermissionMetaData } from '@aiknew/shared-api-decorators'
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
import { AdminUserService } from '../../modules/admin/admin-user/admin-user.service'
import { AdminPermission } from '@aiknew/shared-admin-db'
import { IS_AUTHENTICATED_KEY } from '@aiknew/shared-api-decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminUserService: AdminUserService,
  ) { }

  matchPermission(userPermissions: AdminPermission[], handlerPermissionKey: string) {
    return userPermissions.some((item) => {
      return item.key === handlerPermissionKey
    })
  }

  async canActivate(context: ExecutionContext) {


    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if (isPublic) {
        return true
      }

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

        // check if it's super admin user
        if (await this.adminUserService.isSuperAdminUser(decodedToken.sub)) {
          return true
        }

        // Check if only need to be logged in 
        const isAuthenticated = this.reflector.getAllAndOverride<boolean>(
          IS_AUTHENTICATED_KEY,
          [context.getHandler(), context.getClass()],
        )

        if (isAuthenticated) {
          return true
        }

        // validate permissions
        const permissionMetaData = this.reflector.get<PermissionMetaData | undefined>(PERMISSION_KEY, context.getHandler())
        if (permissionMetaData) {
          const userPermissions = await this.adminUserService.getUserPermissions(decodedToken.sub)
          if (this.matchPermission(userPermissions, permissionMetaData.key)) {
            return true
          }
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
