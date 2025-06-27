import fs from 'node:fs'
import type Stream from 'node:stream'
import openapiTS, { astToString, type OpenAPI3 } from 'openapi-typescript'
import type { Plugin, PluginOption } from 'vite'

export function openApiToTypeScript({
  desc,
  source,
}: {
  source: string | URL | OpenAPI3 | Buffer | Stream.Readable
  desc: string
}): PluginOption {
  return {
    name: 'openapi-to-typescript',
    enforce: 'post',
    apply: 'serve',
    async watchChange(id) {
      console.log('id: ', id, source, desc)
      // exclude the target itself
      if (id.includes(desc)) {
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
