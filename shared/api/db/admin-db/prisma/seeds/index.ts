import { prisma } from './prisma'
import { createSuperAdmin } from './admin-user'
import { createDefaultLangs } from './languages'
import { createAdminRoutes } from './admin-routes'
import { Prisma } from '../../src/prisma-client'
import { createAdminPermissions } from './admin-permissions'

const isSeed = async () => {
  try {

    const count = await prisma.config.count({
      where: { key: 'seed' }
    })

    return Boolean(count)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2021' && err.meta?.modelName === 'Config') {
        return false
      }
    }

    console.log('err: ', err)
    throw err
  }
}

const markSeed = async () => {
  const languages = await prisma.language.findMany()
  await prisma.config.create({
    data: {
      key: 'seed',
      value: "true",
      system: true,
      translations: {
        create: languages.map(lang => {
          return {
            langKey: lang.key,
            name: 'prisma db seed',
            remark: 'Identify whether system data initialization has been performed'
          }
        })
      }

    },
  })
}


async function main() {
  if (await isSeed()) {
    console.log(`It's already seeds, skip it.`)
    return
  }
  await createSuperAdmin()
  await createDefaultLangs()
  await createAdminPermissions()
  await createAdminRoutes()
  await markSeed()
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
