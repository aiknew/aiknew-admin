import { AdminPermissionSource, type PrismaService } from "@aiknew/shared-admin-db"
import type { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core"
import type { I18nService } from "nestjs-i18n"
import { PATH_METADATA, METHOD_METADATA, } from '@nestjs/common/constants';
import { get } from 'lodash-es';
import { RequestMethod } from '@nestjs/common';
import { resolve } from 'path';
import { IS_AUTHENTICATED_KEY, IS_PUBLIC_KEY, PERMISSION_GROUP_DECORATOR_KEY, PERMISSION_KEY, PermissionGroupMetaData, PermissionMetaData } from '@aiknew/shared-api-decorators'

interface Params {
  discovery: DiscoveryService
  reflector: Reflector
  i18n: I18nService
  metadataScanner: MetadataScanner
  prisma: PrismaService
  adminBasePath: string
}

const handleOrphanPermissions = async (prisma: PrismaService, groupId: string, permissionKeys: string[]) => {

  const orphanPermissions = await prisma.adminPermission.findMany({
    where: {
      groupId,
      source: AdminPermissionSource.BUILT_IN,
      key: {
        notIn: permissionKeys
      },
    }
  })

  for (const permission of orphanPermissions) {
    // Is there a permission route associated with it
    const relatedRoutes = await prisma.adminRoutePermission.findMany({
      where: { permissionId: permission.id }
    })

    if (relatedRoutes.length > 0) {
      // has related
      throw new Error(`The corresponding endpoint of permission { id: ${permission.id}, key: ${permission.key} } no longer exists, but some permission routes still associated with it. The routes id is: ` + relatedRoutes.map(item => item.routeId))
    } else {
      // delete it
      await prisma.$transaction(async (tx) => {
        await tx.adminPermissionTranslation.deleteMany({
          where: { permissionId: permission.id }
        })

        await tx.adminPermission.deleteMany({
          where: {
            id: permission.id
          }
        })
      })

    }
  }

}

export const syncPermission = async ({ discovery, i18n, metadataScanner, prisma, reflector, adminBasePath }: Params) => {

  const controllers = discovery.getControllers()
  const allTranslations = i18n.getTranslations()
  const langKeys = Object.keys(allTranslations)


  try {
    for (const controller of controllers) {
      const controllerPath = resolve(adminBasePath, reflector.get<string>(PATH_METADATA, controller.instance.constructor))
      const controllerHandlers = metadataScanner.getAllMethodNames(controller.instance)
      const permissionGroupMeta = reflector.get<PermissionGroupMetaData | undefined>(PERMISSION_GROUP_DECORATOR_KEY, controller.instance.constructor)
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

      const group = await prisma.adminPermissionGroup.upsert({
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

      const permissionKeys: string[] = []
      for (const handlerName of controllerHandlers) {

        const handler = controller.instance[handlerName]
        // is public
        const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [handler, controller.instance.constructor])
        if (isPublic) continue

        // is authenticated
        const isAuthenticated = reflector.getAllAndOverride<boolean>(IS_AUTHENTICATED_KEY, [handler, controller.instance.constructor])
        if (isAuthenticated) continue

        let handlerPath = reflector.get(PATH_METADATA, handler)
        handlerPath = handlerPath === '/' ? '' : handlerPath

        const reqMethod = RequestMethod[reflector.get(METHOD_METADATA, handler)] as keyof typeof RequestMethod
        const fullPath = resolve(controllerPath, handlerPath)
        const handlerMeta = reflector.get<PermissionMetaData | undefined>(PERMISSION_KEY, handler)

        if (handlerMeta) {

          permissionKeys.push(handlerMeta.key)

          const translations = langKeys.map(langKey => {
            const permissionName: string = get(allTranslations[langKey], handlerMeta.name)

            return {
              langKey,
              permissionName
            }
          })

          await prisma.adminPermission.upsert({
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

      }

      await handleOrphanPermissions(prisma, group.id, permissionKeys)

    }
  } catch (err) {
    throw err
  }
}