import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'unplugin-dts/vite'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      bundleTypes: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      name: '@aiknew/shared-ui-components',
      formats: ['es', 'cjs'],
      fileName: (format) => `shared-ui-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vue-i18n',
        'tailwindcss',
        'element-plus',
        '@element-plus/icons-vue',
        '@vueuse/core',
        /node_modules/,
      ],
    },
  },
})
