import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  treeshake: false,
  unbundle: true,
})
