import { join, extname, resolve } from 'node:path'
import { readdir } from 'node:fs/promises'
import { prisma } from './prisma'
import { type Language } from '@prisma/client'
import { readFileSync } from 'node:fs'

const localesDir = join(__dirname, '../../locales')

const cached = <R>(fn: (str: string) => R): ((str: string) => R) => {
  const cache: Record<string, R> = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
const loadJSON = (path: string) =>
  JSON.parse(
    readFileSync(path, {
      encoding: 'utf-8',
    }),
  )
const getTranslation = async (filePath: string) => {
  try {
    const keys = await getLangKeysCached(localesDir)
    const res: Record<string, object> = {}
    for (const key of keys) {
      const json = loadJSON(join(localesDir, key, filePath))
      res[key] = json
    }

    return res
  } catch (err) {
    console.log(err)
  }
}
const getLangKeys = async (localesDir: string) =>
  readdir(localesDir).then((res) => res)

export const getTranslationCached = cached(getTranslation)
export const getLangKeysCached = cached(getLangKeys)
// determine whether the value is need to be translated
export const needTranslate = (val: any): val is Promise<Record<string, any>> =>
  Object.prototype.toString.call(val) === '[object Promise]'
// get translate key and file name from the user provided key, only for the first level file
export const getKeyAndFilePath = (key: string) => {
  const pathArr = key.split('.')
  const fileName = pathArr.shift() + '.json'

  return {
    translateKey: pathArr.join('.'),
    fileName,
  }
}
const getValueByPathString = (obj: object, pathStr: string) => {
  const pathArr = pathStr.split('.')
  let result = obj
  for (let i = 0, len = pathArr.length; i < len; i++) {
    if (result[pathArr[i]] === undefined) {
      return undefined
    }

    result = result[pathArr[i]]
  }

  return result
}
export const t = async (key: string) => {
  const { translateKey, fileName } = getKeyAndFilePath(key)

  const translations = await getTranslationCached(fileName)

  const res: Record<string, any> = {}
  for (const langKey in translations) {
    res[langKey] = getValueByPathString(translations[langKey], translateKey)
  }

  return res
}

let langsArr: Language[] = []
export const getEnabledLangs = async () => {
  if (!langsArr.length) {
    langsArr = await prisma.language.findMany({
      where: {
        status: true,
      },
    })
  }

  return langsArr
}

/**
 * generate the translation data
 * @param rawData
 * @param extraFieldsFromTranslation The key of the map is that needs to be added into the relation table,and the value of the map is the id of the language
 */
export const generateTranslationData = async (rawData: Record<string, any>) => {
  const enabledLangs = await getEnabledLangs()
  const result: Record<string, any> & {
    translations: {
      create: Record<string, any>
    }
  } = {
    translations: {
      create: enabledLangs.map((lang) => {
        return {
          langKey: lang.key,
        }
      }),
    },
  }

  const keys = Object.keys(rawData)
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    if (needTranslate(rawData[key])) {
      const translations = await rawData[key]
      result.translations.create.forEach((data) => {
        data[key] = translations[data.langKey]
      })
    } else {
      result[key] = rawData[key]
    }
  }
  return result
}

/**
 * Merges arrays that are default exported from all TS/JS modules in a specified directory
 * @param {string} folderPath - Directory path to scan for modules
 * @param {boolean} [includeJs=true] - Whether to include JS files in addition to TS files
 * @returns {Promise<T[]>} Merged array containing all elements from module exports
 */
export async function mergeArraysFromModules<T>(
  folderPath: string,
  includeJs: boolean = true,
): Promise<T[]> {
  // Get all files in the directory
  const files = await readdir(folderPath)

  // Filter for TS/JS files
  const validFiles = files.filter((file) => {
    const ext = extname(file)
    return ext === '.ts' || (includeJs && ext === '.js')
  })

  // Merge arrays from all modules
  const mergedArray = await validFiles.reduce(
    async (promisedResult, file) => {
      const result = await promisedResult
      const filePath = resolve(process.cwd(), folderPath, file)

      try {
        // Dynamic import
        const moduleExport = await import(filePath)

        // Check if the default export is an array
        if (Array.isArray(moduleExport.default)) {
          return [...result, ...moduleExport.default] as T[]
        } else {
          console.warn(`Warning: Default export from ${file} is not an array`)
          return result
        }
      } catch (error) {
        console.error(
          `Error processing file ${file}:`,
          error instanceof Error ? error.message : String(error),
        )
        return result
      }
    },
    Promise.resolve([] as T[]),
  )

  return mergedArray
}
