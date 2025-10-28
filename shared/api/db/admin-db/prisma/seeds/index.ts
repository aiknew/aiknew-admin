import { Prisma } from "../../src/prisma-client"
import { prisma } from "./prisma"
import { createDefaultLangs } from "./common-data/languages"
import {
  createAdminRoutes,
  createAdminPermissions,
  createAdminSuperUser,
} from "./admin-data"
import { createFileStorage } from "./common-data/file-storage"

const isSeed = async () => {
  try {
    const count = await prisma.config.count({
      where: { key: "seed", value: "true" },
    })

    return Boolean(count)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2021" && err.meta?.modelName === "Config") {
        return false
      }
    }

    console.log("err: ", err)
    throw err
  }
}

const markSeed = async () => {
  const languages = await prisma.language.findMany()
  await prisma.config.upsert({
    where: {
      key: "seed",
    },

    create: {
      key: "seed",
      value: "true",
      system: true,
      translations: {
        create: languages.map((lang) => {
          return {
            langKey: lang.key,
            name: "prisma db seed",
            remark:
              "Identify whether system data initialization has been performed",
          }
        }),
      },
    },

    update: {
      system: true,
      value: "true",
    },
  })
}

async function main() {
  if (await isSeed()) {
    console.log(`##################################`)
    console.log(`Data has been initialized, skipped`)
    console.log(`##################################`)
    return
  }
  await createDefaultLangs()

  await createAdminSuperUser()
  await createAdminPermissions()
  await createAdminRoutes()

  await createFileStorage()

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
