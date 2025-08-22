import { contentManagement, settings, userInfo } from './data'
import { prisma } from '../prisma'
import { AdminRouteItem } from './types'

const createRoute = (items: AdminRouteItem[], parentId: string) => {
  items.forEach(async (item) => {
    const { name, children, ...data } = item

    const ret = await prisma.adminRoute.create({
      data: {
        ...data,
        parentId,
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
  // return Promise.all([createUserInfo])
  //   .then((res) => {
  //     console.log('res: ', res)
  //     return res
  //   })
  //   .catch((err) => {
  //     console.log('err: ', err)
  //     throw err
  //   })
}
