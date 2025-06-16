import fs from 'node:fs'
import type Stream from 'node:stream'
import openapiTS, { astToString, type OpenAPI3 } from 'openapi-typescript'
import type { PluginOption } from 'vite'

export default function OpenApiTypeScript(
  source: string | URL | OpenAPI3 | Buffer | Stream.Readable,
  desc: string,
): PluginOption {
  return {
    name: 'openapi-typescript',
    enforce: 'post',
    apply: 'serve',
    async watchChange(id) {
      // exclude open-api.ts itself
      if (id.includes('src/types/open-api.ts')) {
        return
      }

      openapiTS(source, {
        enum: false,
        enumValues: true,
      })
        .then((ast) => fs.writeFileSync(desc, astToString(ast)))
        .catch((err) => {
          console.error('generate open-api types file error: ', err)
        })
    },
  }
}
