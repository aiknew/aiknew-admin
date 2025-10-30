import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  tsconfig: "./tsconfig.build.json",
})
