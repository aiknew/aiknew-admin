import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `filer.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        '@vueuse/core',
        '@element-plus/icons-vue',
        '@aiknew/shared-ui-form',
        '@aiknew/shared-ui-form',
        '@aiknew/shared-ui-components',
        'element-plus',
        '@aiknew/shared-ui-locales',
        '@aiknew/shared-ui-table',
        '@aiknew/shared-ui-utils',
        '@aiknew/shared-utils',
        'vue-i18n',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue(), vueJsx(), ElementPlus({}), svgLoader(), dts()],
})
