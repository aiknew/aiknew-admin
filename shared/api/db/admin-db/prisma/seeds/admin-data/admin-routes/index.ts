import { contentManagement, settings, userInfo, homePage } from "./routes"
import { prisma } from "../../prisma"
import { AdminRouteItem } from "./types"

const createRoute = async (
  items: AdminRouteItem[],
  parentId: string | null,
) => {
  for (const item of items) {
    const { name, children, redirect: _, permissions, ...data } = item
    let { redirect } = item

    if (!redirect && children && children.length > 0) {
      // set redirect field
      const firstValidChild = children.find(
        (item) =>
          item.type === "MENU" &&
          !item.hidden &&
          (item.status === undefined || item.status),
      )
      if (firstValidChild) {
        redirect = firstValidChild?.path
      }
    }

    let permissionIds: {
      permissionId: string
    }[] = []

    if (permissions) {
      permissionIds = (
        await prisma.adminPermission.findMany({
          where: {
            key: {
              in: permissions,
            },
          },
          select: {
            id: true,
          },
        })
      ).map((item) => {
        return {
          permissionId: item.id,
        }
      })
    }

    const createdRoute = await prisma.adminRoute.create({
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
            data: permissionIds,
          },
        },
      },
    })

    if (children?.length) {
      await createRoute(children, createdRoute.id)
    }
  }
}

export const createAdminRoutes = async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "AdminRoute" RESTART IDENTITY CASCADE;`,
  )

  await createRoute([homePage], null)
  await createRoute([userInfo], null)
  await createRoute([contentManagement], null)
  await createRoute([settings], null)
}
