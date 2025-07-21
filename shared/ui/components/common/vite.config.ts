import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts(), svgLoader()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `shared-ui-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vue-i18n',
        'element-plus',
        '@aiknew/shared-ui-utils',
        '@aiknew/shared-ui-locales',
        '@element-plus/icons-vue',
        '@vueuse/core',
        'node:stream',
        'node:url',
        'node:perf_hooks',
      ],
    },
  },
})
