import { type AdminRouteCreateInput } from '../../../src/prisma-client'
import { i18n } from './i18n'

export type AdminRouteItem = Omit<
  AdminRouteCreateInput,
  | 'apis'
  | 'id'
  | 'parentId'
  | 'createdAt'
  | 'updatedAt'
  | 'roles'
  | 'translations'
> & { name: (typeof i18n)[keyof typeof i18n]; children?: AdminRouteItem[] }
