import { RouteType, type Prisma } from '../prisma'
import { generateTranslationData, mergeArraysFromModules } from '../util'
import { prisma } from '../prisma'
import { join } from 'node:path'
import { RouteItem } from './types'

const isForbidDuplicateRouteType = (type: RouteType) => {
  return (
    type === RouteType.MENU ||
    type === RouteType.GROUP ||
    type === RouteType.SMALL_GROUP
  )
}

export const createAdminRoutes = async () => {
  const files = await mergeArraysFromModules<RouteItem>(
    join(__dirname, './data'),
  )

  for (const route of files) {
    const children = route.children
    delete route.children
    // create top level Menu
    const data = (await generateTranslationData(
      route,
    )) as Prisma.AdminRouteCreateArgs['data']

    if (isForbidDuplicateRouteType(data.type!)) {
      const isExisted = await prisma.adminRouteTranslation.count({
        where: {
          OR: data?.translations
            ?.create as Prisma.AdminRouteTranslationWhereInput[],
        },
      })

      if (!isExisted) {
        const parent = await prisma.adminRoute.create({
          data,
        })

        // create all children of the current top level Menu
        if (children && children.length) {
          await getChildren(parent.id, children)
        }
      }
    }
  }
}

const getChildren = async (parentId: string, children: any[]) => {
  for (const child of children) {
    const children = child.children
    delete child.children

    const data = (await generateTranslationData(
      child,
    )) as Prisma.AdminRouteCreateArgs['data']

    const current = await prisma.adminRoute.create({
      data: {
        parentId,
        ...data,
      },
    })
    if (children?.length) {
      await getChildren(current.id, children)
    }
  }
}
