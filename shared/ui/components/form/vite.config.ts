import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `form.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'node:stream',
        'node:url',
        'node:perf_hooks',
        'element-plus',
        '@aiknew/shared-ui-components',
        '@aiknew/shared-ui-locales',
        '@aiknew/shared-ui-utils',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(), vueJsx(), , dts()],
})
