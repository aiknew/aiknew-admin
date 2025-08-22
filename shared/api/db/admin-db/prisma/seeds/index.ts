import { prisma } from './prisma'
import { createSuperAdmin } from './admin-user'
import { createDefaultLangs } from './languages'
import { createInitialData } from './initial-data'
import { createAdminRoutes } from './admin-routes'

async function main() {
  // await createInitialData()
  await createSuperAdmin()
  await createDefaultLangs()
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
