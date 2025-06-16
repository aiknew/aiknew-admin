import { prisma } from './prisma'
import { createSuperAdmin } from './admin-user'
import { createDefaultLangs } from './languages'
import { createAdminApis } from './admin-api'
import { createAdminRoutes } from './admin-route'

async function main() {
  await createSuperAdmin()
  await createDefaultLangs()
  await createAdminApis()
  await createAdminRoutes()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
