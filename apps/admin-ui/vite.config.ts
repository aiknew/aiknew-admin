import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'
import { openApiToTypeScript } from '@aiknew/shared-ui-utils'

const convertPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/files': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VueI18nPlugin({
      // include: [convertPath('./src/{locales,views,components}/**/*.json')],
    }),
    ElementPlus({}),
    svgLoader(),
    tailwindcss(),
    openApiToTypeScript({
      source: 'http://localhost:3000/api-doc-json',
      desc: './src/types/open-api.ts'
    })
  ],
  resolve: {
    alias: {
      '@': convertPath('./src')
    }
  }
})
