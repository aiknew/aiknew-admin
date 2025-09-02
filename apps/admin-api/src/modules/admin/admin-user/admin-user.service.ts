import { ConflictException, Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { AppUnauthorizedException } from '@aiknew/shared-api-exceptions'
import { createHMAC } from '@aiknew/shared-api-utils'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'
import { AdminPermission, Prisma, PrismaService } from '@aiknew/shared-admin-db'
import { AuthRouteDto } from '../auth-route/dto/auth-route.dto'
import { RedisService } from '@aiknew/shared-api-redis'

@Injectable()
export class AdminUserService {
  userCacheKey = 'user_'
  userPermissionsCacheKey = this.userCacheKey + 'permissions'
  userRoutesCacheKey = this.userCacheKey + 'routes'

  constructor(
    private prisma: PrismaService,
    private i18n: I18nService,
    private redisService: RedisService,
  ) { }

  get model() {
    return this.prisma.adminUser
  }

  get roleRelModel() {
    return this.prisma.adminUserRole
  }

  get roleRouteRelModel() {
    return this.prisma.adminRoleRoute
  }

  get routeModel() {
    return this.prisma.adminRoute
  }

  buildUserPermissionsCacheKey(userId: string) {
    return this.userPermissionsCacheKey + ':' + userId
  }

  buildUserRoutesCacheKey(userId: string) {
    return this.userRoutesCacheKey + ':' + userId
  }

  async clearAllUserCache() {
    return this.redisService.deleteKeysByPattern(this.userCacheKey + '*')
  }

  async clearUserCache(userId: string) {
    await this.redisService.delete([
      this.buildUserPermissionsCacheKey(userId),
      this.buildUserRoutesCacheKey(userId),
    ])
  }

  setUserPermissionsCache(userId: string, val: string) {
    return this.redisService.set(this.buildUserPermissionsCacheKey(userId), val)
  }

  setUserRoutesCache(userId: string, val: string) {
    return this.redisService.set(this.buildUserRoutesCacheKey(userId), val)
  }

  async getUserRoutesAndPermissions(userId: string) {
    const permissions: AdminPermission[] = []
    let authRoutes: Omit<AuthRouteDto, 'permissions'>[] = []

    const userRoles = await this.roleRelModel.findMany({
      where: {
        adminUserId: userId,
      },
      select: {
        adminRoleId: true,
      },
    })

    const roleRoutes = await this.roleRouteRelModel.findMany({
      where: {
        roleId: {
          in: userRoles.map((role) => role.adminRoleId),
        },

        route: {
          status: true,
        },
      },

      include: {
        route: {
          include: {
            translations: true,
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    })

    authRoutes = roleRoutes.map((val) => {
      const { permissions: userPermissions, ...route } = val.route
      if (userPermissions.length) {
        userPermissions.forEach((item) => {
          if (item.permission) {
            permissions.push(item.permission)
          }
        })
      }

      return route
    })

    // set user caches
    await this.setUserPermissionsCache(userId, JSON.stringify(permissions))
    await this.setUserRoutesCache(userId, JSON.stringify(authRoutes))

    return {
      permissions,
      authRoutes,
    }
  }

  async getUserPermissions(userId: string): Promise<AdminPermission[]> {
    const str = await this.redisService.get(this.buildUserPermissionsCacheKey(userId))
    if (str) {
      return (JSON.parse(str) as AdminPermission[]) ?? []
    }

    const { permissions } = await this.getUserRoutesAndPermissions(userId)

    return permissions
  }

  async getUserRoutes(userId: string): Promise<Omit<AuthRouteDto, 'permissions'>[]> {
    const str = await this.redisService.get(
      this.buildUserRoutesCacheKey(userId),
    )
    if (str) {
      return (JSON.parse(str) as Omit<AuthRouteDto, 'permissions'>[]) ?? []
    }

    const { authRoutes } = await this.getUserRoutesAndPermissions(userId)

    return authRoutes
  }

  // get all routes for super admin user
  async getAllRoutes() {
    return await this.routeModel.findMany({
      where: { status: true },

      include: {
        translations: true,
      },
    })
  }

  async getUserInfo(userId: string) {
    const user = await this.model.findFirstOrThrow({
      where: {
        id: userId,
      },
      omit: {
        password: true,
        tokenVersion: true,
      },
    })

    const routes = user.super
      ? await this.getAllRoutes()
      : await this.getUserRoutes(user.id)

    return {
      ...user,
      routes,
    }
  }

  async isSuperAdminUser(userId: string) {
    const user = await this.model.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppUnauthorizedException(
        this.i18n.t('common.authExpired', {
          lang: I18nContext.current()?.lang,
        }),
      )
    }

    return user.super
  }

  async findUser(userName: string, password: string) {
    try {
      const user = await this.model.findFirstOrThrow({
        where: {
          userName,
          password: createHMAC(password),
        },
        omit: {
          password: true,
          tokenVersion: true,
        },
      })

      let routes: Omit<AuthRouteDto, 'permissions'>[] = []
      if (user.super) {
        // get all routes for super admin user
        routes = await this.routeModel.findMany({
          where: { status: true },

          include: {
            translations: true,
          },
        })
      } else {
        routes = await this.getUserRoutes(user.id)
      }

      return {
        ...user,
        routes,
      }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new AppUnauthorizedException(
              this.i18n.t('admin-user.userNotExists', {
                lang: I18nContext.current()?.lang,
              }),
            )
        }
      }

      throw err
    }
  }

  async pagination(paginationDto: PaginationDto) {
    const users = await this.model.paginate(paginationDto, {
      where: {
        super: false,
      },

      omit: {
        password: true,
        super: true,
        tokenVersion: true,
      },

      include: {
        roles: true,
      },
    })

    return {
      ...users,
      list: users.list.map((user) => {
        return {
          ...user,
          roles: user.roles.map((item) => item.adminRoleId),
        }
      }),
    }
  }

  constructRelatedRoles(
    roleIdArr: string[],
  ): Prisma.AdminUserRoleCreateWithoutAdminUserInput[] {
    return roleIdArr.map((id) => ({
      adminRole: {
        connect: {
          id,
        },
      },
    }))
  }

  async createOne(data: CreateAdminUserDto) {
    const { password, roles, userName } = data
    try {
      return await this.model.create({
        data: {
          userName,
          password: createHMAC(password),
          roles: {
            create: this.constructRelatedRoles(roles),
          },
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(
            this.i18n.t('admin-user.userAlreadyExists'),
          )
        }
      }
      throw err
    }
  }

  async updateOne(id: string, data: UpdateAdminUserDto) {
    const { password, roles, userName } = data
    try {
      // clear user caches
      await this.clearUserCache(id)

      // update user
      return await this.model.update({
        data: {
          userName,
          password: password?.trim() ? createHMAC(password) : undefined,
          roles: {
            deleteMany: {},
            create: this.constructRelatedRoles(roles ?? []),
          },
        },

        where: {
          id,
        },
      })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException(
            this.i18n.t('admin-user.userAlreadyExists'),
          )
        }
      }
      throw err
    }
  }

  async deleteOne(id: string) {
    // clear user caches
    await this.clearUserCache(id)

    // delete related roles
    const deleteRelatedRoles = this.roleRelModel.deleteMany({
      where: {
        adminUserId: id,
      },
    })

    // delete user
    const deleteUser = this.model.delete({
      where: {
        id,
        super: false,
      },
    })

    await this.prisma.$transaction([deleteRelatedRoles, deleteUser])
  }
}
