import { AdminPermissionSource } from "@aiknew/shared-admin-db"
import type { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core"
import type { I18nService } from "nestjs-i18n"
import { PATH_METADATA, METHOD_METADATA, } from '@nestjs/common/constants';
import { get } from 'lodash-es';
import { RequestMethod } from '@nestjs/common';
import { dirname, resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { IS_AUTHENTICATED_KEY, IS_PUBLIC_KEY, PERMISSION_GROUP_DECORATOR_KEY, PERMISSION_KEY, PermissionGroupMetaData, PermissionMetaData } from '@aiknew/shared-api-decorators'

interface Params {
  discovery: DiscoveryService
  reflector: Reflector
  i18n: I18nService
  metadataScanner: MetadataScanner
  adminBasePath: string
}

const writeToTsFile = async (fileName: string, data: Record<string, unknown>[]) => {
  try {
    await writeFile(fileName, `export default ${JSON.stringify(data)}`)
    const generatedPath = resolve(dirname(__filename), '..', fileName)
    console.log(`generated permissions file ${generatedPath}`)
  } catch (err) {
    console.log(`write file ${fileName} failed, error: `, err)
  }
}

export const syncPermission = async ({ discovery, i18n, metadataScanner, reflector, adminBasePath }: Params) => {

  const controllers = discovery.getControllers()
  const allTranslations = i18n.getTranslations()
  const langKeys = Object.keys(allTranslations)

  const permissionsData: (Record<string, unknown> & { permissions: Record<string, unknown>[] })[] = []


  try {
    for (const controller of controllers) {
      const controllerPath = resolve(adminBasePath, reflector.get<string>(PATH_METADATA, controller.instance.constructor))
      const controllerHandlers = metadataScanner.getAllMethodNames(controller.instance)
      const permissionGroupMeta = reflector.get<PermissionGroupMetaData | undefined>(PERMISSION_GROUP_DECORATOR_KEY, controller.instance.constructor)
      let groupTranslations: { langKey: string, groupName: string }[] = []

      if (permissionGroupMeta) {
        groupTranslations = langKeys.map(langKey => {
          const groupName: string = get(allTranslations[langKey], permissionGroupMeta.name)

          return {
            langKey,
            groupName
          }
        })
      }

      permissionsData.push(
        {
          controllerName: controller.name,
          translations: groupTranslations,
          source: AdminPermissionSource.BUILT_IN,
          permissions: []
        }
      )
      for (const handlerName of controllerHandlers) {

        const handler = controller.instance[handlerName]
        // is public
        const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [handler, controller.instance.constructor])
        if (isPublic) continue

        // is authenticated
        const isAuthenticated = reflector.getAllAndOverride<boolean>(IS_AUTHENTICATED_KEY, [handler, controller.instance.constructor])
        if (isAuthenticated) continue

        let handlerPath = reflector.get(PATH_METADATA, handler)
        handlerPath = handlerPath === '/' ? '' : handlerPath

        const reqMethod = RequestMethod[reflector.get(METHOD_METADATA, handler)] as keyof typeof RequestMethod
        const fullPath = resolve(controllerPath, handlerPath)
        const handlerMeta = reflector.get<PermissionMetaData | undefined>(PERMISSION_KEY, handler)

        if (handlerMeta) {

          const translations = langKeys.map(langKey => {
            const permissionName: string = get(allTranslations[langKey], handlerMeta.name)

            return {
              langKey,
              permissionName
            }
          })

          permissionsData[permissionsData.length - 1].permissions.push(
            {
              key: handlerMeta.key,
              method: reqMethod,
              source: AdminPermissionSource.BUILT_IN,
              path: fullPath,
              translations
            }
          )

        } else {
          // warning
          console.warn(`${controller.name}:${handlerName}didn't have @Public decorator or @Permission decorator or @Authenticated on it,it can not be access by default`)
        }

      }

    }

    // write data to json file
    await writeToTsFile('../db/admin-db/prisma/seeds/permissions.ts', permissionsData)
  } catch (err) {
    console.log('err: ', err)
    throw err
  }
}