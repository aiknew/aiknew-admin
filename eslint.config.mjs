import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tseslint from "typescript-eslint"

import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript"
import pluginVue from "eslint-plugin-vue"
import pluginVitest from "@vitest/eslint-plugin"
import pluginPlaywright from "eslint-plugin-playwright"

export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/", "**/tsconfig.json"]),

  // admin-api eslint configuration
  {
    name: "admin-api",
    basePath: ".",
    files: ["./apps/admin-api/**/*.ts", "./shared/api/**/*.ts"],
    ignores: [
      "**/logs/**",
      "**/public/**",
      "shared/api/types/**",
      "shared/api/permission-sync/**",
    ],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        project: [
          "./apps/admin-api/tsconfig.build.json",
          "shared/api/**/tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          vars: "all",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // admin-ui eslint configuration
  {
    name: "admin-ui",
    basePath: ".",
    files: ["./apps/admin-ui/**/*"],
    ignores: ["apps/admin-ui/src/types/open-api.ts"],
    extends: [
      defineConfigWithVueTs(
        {
          name: "app/files-to-lint",
          files: ["apps/admin-ui/**/*.{ts,mts,tsx,vue}"],
        },

        globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

        pluginVue.configs["flat/essential"],
        vueTsConfigs.recommended,

        {
          ...pluginVitest.configs.recommended,
          files: ["apps/admin-ui/src/**/__tests__/*"],
        },

        {
          ...pluginPlaywright.configs["flat/recommended"],
          files: ["apps/admin-ui/e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
        },
      ),

      eslintPluginPrettierRecommended,
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
        project: [
          "./apps/admin-ui/tsconfig.json",
          "./apps/admin-ui/tsconfig.app.json",
          "./apps/admin-ui/tsconfig.node.json",
          "./apps/admin-ui/tsconfig.vitest.json",
          "shared/ui/**/tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
