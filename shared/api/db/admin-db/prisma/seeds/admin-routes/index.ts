import { contentManagement, settings, userInfo } from './data'
import { prisma } from '../prisma'
import { AdminRouteItem } from './types'

const createRoute = (items: AdminRouteItem[], parentId: string) => {
  items.forEach(async (item) => {
    let { name, children, redirect, permissions, ...data } = item

    if (!redirect && children && children.length > 0) {

      const firstValidChild = children.find(item => item.type === 'MENU' && !item.hidden && (item.status === undefined || item.status))
      if (firstValidChild) {
        redirect = firstValidChild?.path
      }
    }

    const permissionIds = (await prisma.adminPermission.findMany({
      where: {
        key: {
          in: permissions
        }
      },
      select: {
        id: true
      }
    })).map(item => {
      return {
        permissionId: item.id
      }
    })


    const ret = await prisma.adminRoute.create({
      data: {
        ...data,
        parentId,
        redirect,
        translations: {
          createMany: {
            data: Object.entries(name).map(([key, val]) => ({
              langKey: key,
              routeName: val,
            })),
          },
        },
        permissions: {
          createMany: {
            data: permissionIds
          }
        }
      },
    })

    if (children?.length) {
      createRoute(children, ret.id)
    }
  })
}

export const createAdminRoutes = async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "AdminRoute" RESTART IDENTITY CASCADE;`,
  )

  createRoute([userInfo], '0')
  createRoute([contentManagement], '0')
  createRoute([settings], '0')
}
