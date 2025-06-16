import { ConflictException, Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PaginationDto } from '@aiknew/shared-api-dtos'
import { AppUnauthorizedException } from '@aiknew/shared-api-exceptions'
import { createHMAC } from '@aiknew/shared-api-utils'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'
import { AdminApi, Prisma, PrismaService } from '@aiknew/shared-api-prisma'
import { AdminRouteDto } from '../admin-route/dto/admin-route.dto'
import { RedisService } from '@aiknew/shared-api-redis'

@Injectable()
export class AdminUserService {
  userCacheKey = 'user_'
  userApisCacheKey = this.userCacheKey + 'apis'
  userRoutesCacheKey = this.userCacheKey + 'routes'

  constructor(
    private prisma: PrismaService,
    private i18n: I18nService,
    private redisService: RedisService,
  ) {}

  buildUserApisCacheKey(userId: string) {
    return this.userApisCacheKey + ':' + userId
  }

  buildUserRoutesCacheKey(userId: string) {
    return this.userRoutesCacheKey + ':' + userId
  }

  async clearAllUserCache() {
    return this.redisService.deleteKeysByPattern(this.userCacheKey + '*')
  }

  async clearUserCache(userId: string) {
    await this.redisService.delete([
      this.buildUserApisCacheKey(userId),
      this.buildUserRoutesCacheKey(userId),
    ])
  }

  setUserApisCache(userId: string, val: string) {
    return this.redisService.set(this.buildUserApisCacheKey(userId), val)
  }

  setUserRoutesCache(userId: string, val: string) {
    return this.redisService.set(this.buildUserRoutesCacheKey(userId), val)
  }

  async getUserRoutesAndApis(userId: string) {
    const authApis: AdminApi[] = []
    let authRoutes: Omit<AdminRouteDto, 'apis'>[] = []

    const userRoles = await this.prisma.adminUserRole.findMany({
      where: {
        adminUserId: userId,
      },
      select: {
        adminRoleId: true,
      },
    })

    const roleRoutes = await this.prisma.adminRoleRoute.findMany({
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
            apis: {
              include: {
                api: true,
              },
            },
          },
        },
      },
    })

    authRoutes = roleRoutes.map((val) => {
      const { apis, ...route } = val.route
      if (apis.length) {
        apis.forEach((item) => {
          if (item.api) {
            authApis.push(item.api)
          }
        })
      }

      return route
    })

    // set user caches
    await this.setUserApisCache(userId, JSON.stringify(authApis))
    await this.setUserRoutesCache(userId, JSON.stringify(authRoutes))

    return {
      authApis,
      authRoutes,
    }
  }

  async getUserApis(userId: string): Promise<AdminApi[]> {
    const str = await this.redisService.get(this.buildUserApisCacheKey(userId))
    if (str) {
      return (JSON.parse(str) as AdminApi[]) ?? []
    }

    const { authApis } = await this.getUserRoutesAndApis(userId)

    return authApis
  }

  async getUserRoutes(userId: string): Promise<Omit<AdminRouteDto, 'apis'>[]> {
    const str = await this.redisService.get(
      this.buildUserRoutesCacheKey(userId),
    )
    if (str) {
      return (JSON.parse(str) as Omit<AdminRouteDto, 'apis'>[]) ?? []
    }

    const { authRoutes } = await this.getUserRoutesAndApis(userId)

    return authRoutes
  }

  // get all routes for super admin user
  async getAllRoutes() {
    return await this.prisma.adminRoute.findMany({
      where: { status: true },

      include: {
        translations: true,
      },
    })
  }

  async getUserInfo(userId: string) {
    const user = await this.prisma.adminUser.findFirstOrThrow({
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
    const user = await this.prisma.adminUser.findUnique({
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
      const user = await this.prisma.adminUser.findFirstOrThrow({
        where: {
          userName,
          password: createHMAC(password),
        },
        omit: {
          password: true,
          tokenVersion: true,
        },
      })

      let routes: Omit<AdminRouteDto, 'apis'>[] = []
      if (user.super) {
        // get all routes for super admin user
        routes = await this.prisma.adminRoute.findMany({
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
    const users = await this.prisma.adminUser.paginate(paginationDto, {
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

  async createOne(createAdminUserDto: CreateAdminUserDto) {
    const { password, roles, userName } = createAdminUserDto
    try {
      return await this.prisma.adminUser.create({
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

  async updateOne(id: string, updateAdminUserDto: UpdateAdminUserDto) {
    const { password, roles, userName } = updateAdminUserDto
    try {
      // clear user caches
      await this.clearUserCache(id)

      // update user
      return await this.prisma.adminUser.update({
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
    const deleteRelatedRoles = this.prisma.adminUserRole.deleteMany({
      where: {
        adminUserId: id,
      },
    })

    // delete user
    const deleteUser = this.prisma.adminUser.delete({
      where: {
        id,
        super: false,
      },
    })

    await this.prisma.$transaction([deleteRelatedRoles, deleteUser])
  }
}
