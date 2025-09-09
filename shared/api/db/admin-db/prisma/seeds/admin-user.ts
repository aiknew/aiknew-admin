import { createHMAC } from '../../../../utils/src/index'
import { prisma } from './prisma'

// Create default super admin user
export const createSuperAdmin = async () => {
  if (!process.env.SUPER_ADMIN_USER_PASSWORD) {
    throw new Error('required SUPER_ADMIN_USER_PASSWORD environment variable')
  }
  if (!process.env.SUPER_ADMIN_USER_NAME) {
    throw new Error('required SUPER_ADMIN_USER_NAME environment variable')
  }

  const password = createHMAC(process.env.SUPER_ADMIN_USER_PASSWORD)
  await prisma.adminUser.upsert({
    where: { userName: process.env.SUPER_ADMIN_USER_NAME },
    update: {
      password,
    },
    create: {
      userName: process.env.SUPER_ADMIN_USER_NAME,
      super: true,
      password,
    },
  })
}
