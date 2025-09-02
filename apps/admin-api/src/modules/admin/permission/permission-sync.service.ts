import { AdminPermissionSource, PrismaService } from "@aiknew/shared-admin-db";
import { PERMISSION_KEY, PERMISSION_GROUP_DECORATOR_KEY, PermissionGroupMetaData, PermissionMetaData, IS_PUBLIC_KEY, IS_AUTHENTICATED_KEY } from "@aiknew/shared-api-decorators";
import { Injectable, RequestMethod, } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { PATH_METADATA, METHOD_METADATA, } from '@nestjs/common/constants';
import { adminBasePath } from "src/common/constants";
import { resolve } from "node:path";
import { I18nService } from "nestjs-i18n";
import { get } from 'lodash-es'


@Injectable()
export class PermissionSyncService {
  constructor(private readonly prisma: PrismaService,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
    private readonly i18nService: I18nService

  ) { }

  get permissionModel() {
    return this.prisma.adminPermission
  }

  get permissionGroupModel() {
    return this.prisma.adminPermissionGroup
  }

  async sync() {
    try {

      const controllers = this.discoveryService.getControllers()
      const allTranslations = this.i18nService.getTranslations()
      const langKeys = Object.keys(allTranslations)

      controllers.forEach(async (controller) => {
        const controllerPath = resolve(adminBasePath, this.reflector.get<string>(PATH_METADATA, controller.instance.constructor))
        const controllerHandlers = this.metadataScanner.getAllMethodNames(controller.instance)
        const permissionGroupMeta = this.reflector.get<PermissionGroupMetaData | undefined>(PERMISSION_GROUP_DECORATOR_KEY, controller.instance.constructor)
        let groupTranslations: { langKey: string, groupName: string }[] = []

        if (permissionGroupMeta) {
          groupTranslations = langKeys.map(langKey => {
            const groupName: string = get(allTranslations[langKey], permissionGroupMeta.name)

            return {
              langKey,
              groupName
            }
          })
        }

        const group = await this.permissionGroupModel.upsert({
          where: {
            controllerName: controller.name
          },

          update: {
            translations: {
              deleteMany: {},
              createMany: {
                data: groupTranslations
              }
            }
          },

          create: {
            controllerName: controller.name,
            source: AdminPermissionSource.BUILT_IN,
            translations: {
              createMany: {
                data: groupTranslations
              }
            }
          }

        })

        controllerHandlers.forEach(async (handlerName) => {
          const handler = controller.instance[handlerName]
          // is public
          const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [handler, controller.instance.constructor])
          if (isPublic) return

          // is authenticated
          const isAuthenticated = this.reflector.getAllAndOverride<boolean>(IS_AUTHENTICATED_KEY, [handler, controller.instance.constructor])
          if (isAuthenticated) return

          let handlerPath = this.reflector.get(PATH_METADATA, handler)
          handlerPath = handlerPath === '/' ? '' : handlerPath
          const reqMethod = RequestMethod[this.reflector.get(METHOD_METADATA, handler)] as keyof typeof RequestMethod
          const fullPath = resolve(controllerPath, handlerPath)
          const handlerMeta = this.reflector.get<PermissionMetaData | undefined>(PERMISSION_KEY, handler)

          if (handlerMeta) {

            const translations = langKeys.map(langKey => {
              const permissionName: string = get(allTranslations[langKey], handlerMeta.name)

              return {
                langKey,
                permissionName
              }
            })

            await this.permissionModel.upsert({
              where: { key: handlerMeta.key },
              update: {
                groupId: group.id,
                method: reqMethod,
                path: fullPath,
                source: AdminPermissionSource.BUILT_IN,
                translations: {
                  deleteMany: {},
                  createMany: {
                    data: translations
                  }
                }
              },
              create: {
                key: handlerMeta.key,
                method: reqMethod,
                source: AdminPermissionSource.BUILT_IN,
                groupId: group.id,
                path: fullPath,
                translations: {
                  createMany: {
                    data: translations
                  }
                }
              }
            })
          } else {
            // warning
            console.warn(`${controller.name}:${handlerName}didn't have @Public decorator or @Permission decorator or @Authenticated on it,it can not be access by default`)
          }

        })

      })
    } catch (err) {
      console.log('auth api sync err: ', err)
    }
  }
}