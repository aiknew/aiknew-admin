import fs from 'node:fs'
import openapiTS, { astToString } from 'openapi-typescript'
import type { PluginOption } from 'vite'

export default function OpenApiTypeScript(): PluginOption {
  return {
    name: 'openapi-typescript',
    enforce: 'post',
    apply: 'serve',
    async watchChange(id) {
      // exclude open-api.ts itself
      if (id.includes('src/types/open-api.ts')) {
        return
      }

      openapiTS('http://localhost:3000/api-doc-json', {
        enum: false,
        enumValues: true,
      })
        .then((ast) => fs.writeFileSync('./src/types/open-api.ts', astToString(ast)))
        .catch((err) => {
          console.error('generate open-api types file error: ', err)
        })
    },
  }
}
