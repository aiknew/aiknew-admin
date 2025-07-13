import { Prisma, RouteType } from '../prisma'

export type RouteItem = {
  routeName: Promise<Record<string, any>>
  type: RouteType
  path?: string
  icon?: string
  key?: string
  hidden?: boolean
  redirect?: string
  component?: string
  children?: RouteItem[]
  apis?:
    | Prisma.AdminRouteApiUncheckedCreateNestedManyWithoutRouteInput
    | Prisma.AdminRouteApiCreateNestedManyWithoutRouteInput
}
