import { contentManagement, settings, userInfo } from './data'
import { prisma } from '../prisma'
import { AdminRouteItem } from './types'

const createRoute = (items: AdminRouteItem[], parentId: string) => {
  items.forEach(async (item) => {
    let { name, children, redirect, ...data } = item

    if (!redirect && children && children.length > 0) {

      const firstValidChild = children.find(item => item.type === 'MENU' && !item.hidden && (item.status === undefined || item.status))
      if (firstValidChild) {
        redirect = firstValidChild?.path
      }
    }


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
