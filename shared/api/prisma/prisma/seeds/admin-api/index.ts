import { prisma } from '../prisma'
import { generateTranslationData, mergeArraysFromModules } from '../util'
import { type Prisma } from '@prisma/client'
import { join } from 'path'
import { ApiItem } from './types'

// create initial admin API list
export const createAdminApis = async () => {
  const files = await mergeArraysFromModules<ApiItem>(join(__dirname, './data'))

  for (const api of files) {
    const children = api.children
    delete api.children

    // create top level API
    const data = (await generateTranslationData(
      api,
    )) as Prisma.AdminApiCreateArgs['data']
    const parent = await prisma.adminApi.upsert({
      where: {
        url_method: {
          url: data.url,
          method: data.method!,
        },
      },
      update: {},
      create: data,
    })

    // create all children of the current top level API
    if (children && children.length) {
      for (const child of children) {
        await prisma.adminApi.upsert({
          where: {
            url_method: {
              url: child.url,
              method: child.method,
            },
          },
          update: {},
          create: {
            parentId: parent.id,
            ...((await generateTranslationData(
              child,
            )) as Prisma.AdminApiCreateArgs['data']),
          },
        })
      }
    }
  }
}
