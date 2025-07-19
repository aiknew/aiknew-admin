import { prisma } from './prisma'
import { createSuperAdmin } from './admin-user'
import { createDefaultLangs } from './languages'
import { createInitialData } from './initial-data'

async function main() {
  await createInitialData()
  await createSuperAdmin()
  await createDefaultLangs()
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
