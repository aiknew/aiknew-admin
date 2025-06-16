import { registerAs } from '@nestjs/config'
import { join } from 'node:path'

type Options = {
  mainFolder: string
}

export default (options: Options) => {
  return registerAs('common', () => {
    // The folder where the template file resides
    const viewsFolder = join(options.mainFolder, '../views')
    // Multilingual text folder
    const localesFolder = join(options.mainFolder, '../locales')
    // Public folders
    const publicFolder = join(options.mainFolder, '../public')
    // Folders that store public uploaded files
    const publicFileFolder = join(publicFolder, './files')

    return {
      viewsFolder,
      localesFolder,
      publicFolder,
      publicFileFolder,
    }
  })
}
