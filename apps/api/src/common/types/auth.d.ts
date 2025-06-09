import { Request } from 'express'

export type AdminJWTPayload = {
  userName: string
  sub: string
}

export type AuthAdminUser = {
  userName: string
  userId: string
}

export type AuthAdminRequest = Request & {
  adminUser: AuthAdminUser
}
