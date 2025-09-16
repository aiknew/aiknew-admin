import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer"
import { openApiToTypeScript } from './src/utils/vite-plugin-openapi-typescript'
import { compression } from 'vite-plugin-compression2'
import * as path from 'node:path'
import * as fs from 'node:fs'

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
  optimizeDeps: {
    exclude: ['colorette']
  },
  build: {
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@opentiny/fluent-editor', '@element-plus/icons-vue']
        },
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VueI18nPlugin({}),
    ElementPlus({}),
    svgLoader(),
    tailwindcss(),
    openApiToTypeScript({
      source: 'http://localhost:3000/api-doc-json',
      desc: './src/types/open-api.ts'
    }) as import('vite').Plugin,
    // visualizer({
    //   open: true,
    //   sourcemap: false,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
    compression({
      algorithms: ['gzip'],
      threshold: 1000 // Only compress files larger than 1KB
    }),
    {
      name: 'generate-version',
      closeBundle() {
        const versionData = { version: Date.now() };
        const filePath = path.resolve(__dirname, 'dist', 'version.json');
        fs.writeFileSync(filePath, JSON.stringify(versionData));
      }
    }
  ],
  resolve: {
    alias: {
      '@': convertPath('./src')
    },
    dedupe: ['vue', 'element-plus']
  }
})
