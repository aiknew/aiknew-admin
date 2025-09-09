import { prisma } from './prisma'
import permissionsData from '../../../../permission-sync/src/permissions'
import { AdminPermissionSource, RequestMethod } from '../../src/prisma-client'


const handleOrphanPermissions = async (groupId: string, permissionKeys: string[]) => {

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

export const createAdminPermissions = async () => {
  for (const item of permissionsData) {

    const translations = item.translations

    const group = await prisma.adminPermissionGroup.upsert({
      where: {
        controllerName: item.controllerName
      },

      update: {
        translations: {
          deleteMany: {},
          createMany: {
            data: translations
          }
        }
      },

      create: {
        controllerName: item.controllerName,
        source: AdminPermissionSource.BUILT_IN,
        translations: {
          createMany: {
            data: translations
          }
        }
      }

    })

    for (const permission of item.permissions) {
      const translations = permission.translations

      await prisma.adminPermission.upsert({
        where: { key: permission.key },
        update: {
          groupId: group.id,
          method: permission.method as RequestMethod,
          path: permission.path,
          source: AdminPermissionSource.BUILT_IN,
          translations: {
            deleteMany: {},
            createMany: {
              data: translations
            }
          }
        },
        create: {
          key: permission.key,
          method: permission.method as RequestMethod,
          source: AdminPermissionSource.BUILT_IN,
          groupId: group.id,
          path: permission.path,
          translations: {
            createMany: {
              data: translations
            }
          }
        }
      })
    }

    await handleOrphanPermissions(group.id, item.permissions.map(item => item.key))
  }
}