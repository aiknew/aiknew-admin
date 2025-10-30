import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"
import { fileURLToPath } from "node:url"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import ElementPlus from "unplugin-element-plus/vite"
import svgLoader from "vite-svg-loader"
import tailwindcss from "@tailwindcss/vite"
import { visualizer } from "rollup-plugin-visualizer"
import { openApiToTypeScript } from "./src/utils/vite-plugin-openapi-typescript"
import { compression } from "vite-plugin-compression2"
import * as path from "node:path"
import * as fs from "node:fs"
import { ADMIN_API_PORT } from "@aiknew/shared-constants"
import Inspect from "vite-plugin-inspect"

const convertPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${ADMIN_API_PORT}`,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/files": {
        target: `http://localhost:${ADMIN_API_PORT}`,
      },
    },
  },
  optimizeDeps: {
    exclude: ["colorette"],
  },
  build: {
    sourcemap: false,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          "element-icons": ["@element-plus/icons-vue"],
          zod: ["zod"],
          "vue-router": ["vue-router"],
          "vue-i18n": ["vue-i18n"],
          "echarts-components": ["echarts/components"],
          echarts: ["echarts"],
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VueI18nPlugin({
      include: convertPath("../../shared/ui/locales/src/*.json"),
    }) as import("vite").Plugin,
    ElementPlus({}) as import("vite").Plugin,
    svgLoader() as import("vite").Plugin,
    tailwindcss(),
    openApiToTypeScript({
      source: `http://localhost:${ADMIN_API_PORT}/api-doc-json`,
      desc: "./src/types/open-api.ts",
    }) as import("vite").Plugin,
    visualizer({
      open: true,
      sourcemap: false,
      gzipSize: true,
      brotliSize: true,
    }),
    compression({
      algorithms: ["gzip"],
      threshold: 1000, // Only compress files larger than 1KB
    }) as import("vite").Plugin,
    Inspect(),
    {
      name: "generate-version",
      closeBundle() {
        const versionData = { version: Date.now() }
        const dir = path.resolve(__dirname, "dist")
        const filePath = path.join(dir, "version.json")
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(filePath, JSON.stringify(versionData))
      },
    },
  ],
  resolve: {
    alias: {
      "@": convertPath("./src"),
    },
    dedupe: ["vue", "vue-router", "element-plus"],
  },
})
