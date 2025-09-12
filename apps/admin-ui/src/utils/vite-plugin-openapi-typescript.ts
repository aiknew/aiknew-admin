import fs from 'node:fs'
import path from 'node:path'
import type Stream from 'node:stream'
import openapiTS, { astToString, type OpenAPI3 } from 'openapi-typescript'
import type { Plugin } from 'vite'

export function openApiToTypeScript({
  desc,
  source,
}: {
  source: string | URL | OpenAPI3 | Buffer | Stream.Readable
  desc: string
}): Plugin {
  return {
    name: 'openapi-to-typescript',
    enforce: 'post',
    apply: 'serve',
    async watchChange(id) {
      // exclude the target itself
      if (id.includes(path.normalize(desc))) {
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
