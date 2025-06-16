import { glob } from 'glob'
import { copyFile } from 'fs/promises'
import { basename, resolve } from 'path'

const pattern = 'features/**/*.prisma'

const copyPrismaSchemas = async () => {
  const schemas = await glob(pattern, { ignore: 'node_modules/**' })
  const promises: Promise<void>[] = []
  for (const file of schemas) {
    console.log(file)
    promises.push(
      copyFile(
        resolve(__dirname, '..', file),
        resolve(__dirname, '../shared/database/prisma', basename(file)),
      ),
    )
  }

  try {
    await Promise.all(promises)
  } catch (err) {
    console.log('copy prisma schemas error: ', err)
  }
}

copyPrismaSchemas()
